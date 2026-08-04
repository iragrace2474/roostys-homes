import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'roosty.db');

// Reuse the connection across Next.js dev-mode hot reloads instead of
// re-opening (and re-running CREATE TABLE) on every module reload.
declare global {
  // eslint-disable-next-line no-var
  var __roostyDb: DatabaseSync | undefined;
}

// Node's synchronous DatabaseSync has no async retry hook, so a blocked
// SQLITE_BUSY write is retried with a real (blocking) sleep between
// attempts — acceptable here since this only runs during the brief
// connect()/schema-setup window, not on the request hot path.
function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// Retries any SQLite operation that fails with "database is locked" —
// covers both the exec() schema setup below and (via the exported
// withRetry) seed.ts's insert burst, which multiple build workers can hit
// concurrently on a brand new database file.
export function withRetry<T>(fn: () => T, attempts = 8): T {
  for (let i = 0; i < attempts; i++) {
    try {
      return fn();
    } catch (err) {
      const isLocked = err instanceof Error && 'code' in err && err.code === 'ERR_SQLITE_ERROR';
      if (!isLocked || i === attempts - 1) throw err;
      sleepSync(150 * (i + 1));
    }
  }
  throw new Error('unreachable');
}

function execWithRetry(database: DatabaseSync, sql: string): void {
  withRetry(() => database.exec(sql));
}

function connect(): DatabaseSync {
  const database = new DatabaseSync(DB_PATH);
  // Next's build spawns multiple worker processes that each import this
  // module (via the seed side-effect import in the root layout) and race to
  // open/CREATE TABLE the same file. WAL allows concurrent readers, but
  // writers still serialize — busy_timeout makes a blocked connection wait
  // instead of throwing "database is locked" immediately, and execWithRetry
  // covers the brief window before busy_timeout itself has taken effect.
  execWithRetry(database, 'PRAGMA busy_timeout = 8000;');
  execWithRetry(database, 'PRAGMA journal_mode = WAL;');
  execWithRetry(
    database,
    `
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL,
      price_unit TEXT NOT NULL DEFAULT 'per night',
      max_guests INTEGER NOT NULL DEFAULT 2,
      size_sqm INTEGER,
      images TEXT NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      quantity INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      image TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL REFERENCES rooms(id),
      guest_name TEXT NOT NULL,
      guest_email TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      guests_count INTEGER NOT NULL DEFAULT 1,
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT
    );
  `
  );

  // Migration for databases created before `quantity` existed — SQLite has
  // no "ADD COLUMN IF NOT EXISTS", so check first.
  const roomColumns = database.prepare('PRAGMA table_info(rooms)').all() as { name: string }[];
  if (!roomColumns.some((c) => c.name === 'quantity')) {
    execWithRetry(database, 'ALTER TABLE rooms ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;');
  }

  return database;
}

export const db = globalThis.__roostyDb ?? (globalThis.__roostyDb = connect());

// ---- Types ----

export type Room = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_unit: string;
  max_guests: number;
  size_sqm: number | null;
  images: string[];
  sort_order: number;
  active: 0 | 1;
  /** How many physical rooms of this type exist — lets that many overlapping
   * bookings be confirmed for the same dates before it's fully booked. */
  quantity: number;
};

export type Service = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string | null;
  sort_order: number;
  active: 0 | 1;
};

export type BookingStatus = 'pending' | 'confirmed' | 'declined';

export type Booking = {
  id: number;
  room_id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  message: string;
  status: BookingStatus;
  created_at: string;
};

export type BlogPostStatus = 'draft' | 'published';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: BlogPostStatus;
  published_at: string | null;
};

type RoomRow = Omit<Room, 'images'> & { images: string };

function parseRoom(row: RoomRow): Room {
  return { ...row, images: JSON.parse(row.images) as string[] };
}

// ---- Rooms ----

export function listRooms(activeOnly = true): Room[] {
  const rows = (
    activeOnly
      ? db.prepare('SELECT * FROM rooms WHERE active = 1 ORDER BY sort_order, id').all()
      : db.prepare('SELECT * FROM rooms ORDER BY sort_order, id').all()
  ) as unknown as RoomRow[];
  return rows.map(parseRoom);
}

export function getRoomBySlug(slug: string): Room | undefined {
  const row = db.prepare('SELECT * FROM rooms WHERE slug = ?').get(slug) as RoomRow | undefined;
  return row ? parseRoom(row) : undefined;
}

export function getRoomById(id: number): Room | undefined {
  const row = db.prepare('SELECT * FROM rooms WHERE id = ?').get(id) as RoomRow | undefined;
  return row ? parseRoom(row) : undefined;
}

export function createRoom(input: Omit<Room, 'id'>): number {
  const result = db
    .prepare(
      `INSERT INTO rooms (slug, name, description, price, price_unit, max_guests, size_sqm, images, sort_order, active, quantity)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.slug,
      input.name,
      input.description,
      input.price,
      input.price_unit,
      input.max_guests,
      input.size_sqm,
      JSON.stringify(input.images),
      input.sort_order,
      input.active,
      input.quantity
    );
  return Number(result.lastInsertRowid);
}

export function updateRoom(id: number, input: Omit<Room, 'id'>): void {
  db.prepare(
    `UPDATE rooms SET slug=?, name=?, description=?, price=?, price_unit=?, max_guests=?, size_sqm=?, images=?, sort_order=?, active=?, quantity=?
     WHERE id=?`
  ).run(
    input.slug,
    input.name,
    input.description,
    input.price,
    input.price_unit,
    input.max_guests,
    input.size_sqm,
    JSON.stringify(input.images),
    input.sort_order,
    input.active,
    input.quantity,
    id
  );
}

export function deleteRoom(id: number): void {
  db.prepare('DELETE FROM rooms WHERE id = ?').run(id);
}

// ---- Services ----

export function listServices(activeOnly = true): Service[] {
  return (
    activeOnly
      ? db.prepare('SELECT * FROM services WHERE active = 1 ORDER BY sort_order, id').all()
      : db.prepare('SELECT * FROM services ORDER BY sort_order, id').all()
  ) as unknown as Service[];
}

export function getServiceById(id: number): Service | undefined {
  return db.prepare('SELECT * FROM services WHERE id = ?').get(id) as Service | undefined;
}

export function createService(input: Omit<Service, 'id'>): number {
  const result = db
    .prepare(
      `INSERT INTO services (slug, name, description, image, sort_order, active) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(input.slug, input.name, input.description, input.image, input.sort_order, input.active);
  return Number(result.lastInsertRowid);
}

export function updateService(id: number, input: Omit<Service, 'id'>): void {
  db.prepare(
    `UPDATE services SET slug=?, name=?, description=?, image=?, sort_order=?, active=? WHERE id=?`
  ).run(input.slug, input.name, input.description, input.image, input.sort_order, input.active, id);
}

export function deleteService(id: number): void {
  db.prepare('DELETE FROM services WHERE id = ?').run(id);
}

// ---- Bookings ----

export function listBookings(status?: BookingStatus): Booking[] {
  return (
    status
      ? db.prepare('SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC').all(status)
      : db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all()
  ) as unknown as Booking[];
}

export function getBookingById(id: number): Booking | undefined {
  return db.prepare('SELECT * FROM bookings WHERE id = ?').get(id) as Booking | undefined;
}

export function listConfirmedBookingsForRoom(roomId: number): Booking[] {
  return db
    .prepare("SELECT * FROM bookings WHERE room_id = ? AND status = 'confirmed'")
    .all(roomId) as unknown as Booking[];
}

// Overlap check: two ranges [aStart, aEnd) and [bStart, bEnd) overlap iff
// aStart < bEnd AND bStart < aEnd (dates are ISO strings, e.g. '2026-03-05',
// so lexicographic comparison matches chronological comparison).
function countConfirmedOverlap(roomId: number, checkIn: string, checkOut: string): number {
  const row = db
    .prepare(
      `SELECT COUNT(*) as c FROM bookings
       WHERE room_id = ? AND status = 'confirmed' AND check_in < ? AND ? < check_out`
    )
    .get(roomId, checkOut, checkIn) as { c: number };
  return row.c;
}

// A room with `quantity` physical units isn't fully booked until that many
// confirmed bookings overlap the requested dates.
export function hasConfirmedOverlap(roomId: number, checkIn: string, checkOut: string): boolean {
  const room = getRoomById(roomId);
  const quantity = Math.max(1, room?.quantity ?? 1);
  return countConfirmedOverlap(roomId, checkIn, checkOut) >= quantity;
}

// The calendar needs actual disabled date ranges, not just a yes/no check —
// this sweeps the confirmed bookings' check-in/check-out boundaries and
// returns only the sub-ranges where every unit of the room is taken at once
// (accounting for `quantity`), merging where they touch or overlap.
export function listFullyBookedRanges(roomId: number): { check_in: string; check_out: string }[] {
  const room = getRoomById(roomId);
  const quantity = Math.max(1, room?.quantity ?? 1);
  const bookings = listConfirmedBookingsForRoom(roomId);
  if (bookings.length === 0) return [];

  const deltaByDate = new Map<string, number>();
  for (const b of bookings) {
    deltaByDate.set(b.check_in, (deltaByDate.get(b.check_in) ?? 0) + 1);
    deltaByDate.set(b.check_out, (deltaByDate.get(b.check_out) ?? 0) - 1);
  }
  const dates = [...deltaByDate.keys()].sort();

  const ranges: { check_in: string; check_out: string }[] = [];
  let count = 0;
  let fullStart: string | null = null;
  for (const date of dates) {
    const wasFull = count >= quantity;
    count += deltaByDate.get(date)!;
    const isFull = count >= quantity;
    if (!wasFull && isFull) {
      fullStart = date;
    } else if (wasFull && !isFull && fullStart) {
      ranges.push({ check_in: fullStart, check_out: date });
      fullStart = null;
    }
  }
  return ranges;
}

export function createBooking(input: Omit<Booking, 'id' | 'status' | 'created_at'>): number {
  const result = db
    .prepare(
      `INSERT INTO bookings (room_id, guest_name, guest_email, guest_phone, check_in, check_out, guests_count, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`
    )
    .run(
      input.room_id,
      input.guest_name,
      input.guest_email,
      input.guest_phone,
      input.check_in,
      input.check_out,
      input.guests_count,
      input.message
    );
  return Number(result.lastInsertRowid);
}

export function setBookingStatus(id: number, status: BookingStatus): void {
  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
}

// ---- Blog posts ----

export function listBlogPosts(publishedOnly = true): BlogPost[] {
  return (
    publishedOnly
      ? db
          .prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC")
          .all()
      : db.prepare("SELECT * FROM blog_posts ORDER BY COALESCE(published_at, '') DESC, id DESC").all()
  ) as unknown as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(slug) as BlogPost | undefined;
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as BlogPost | undefined;
}

export function createBlogPost(input: Omit<BlogPost, 'id'>): number {
  const result = db
    .prepare(
      `INSERT INTO blog_posts (slug, title, excerpt, content, cover_image, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(input.slug, input.title, input.excerpt, input.content, input.cover_image, input.status, input.published_at);
  return Number(result.lastInsertRowid);
}

export function updateBlogPost(id: number, input: Omit<BlogPost, 'id'>): void {
  db.prepare(
    `UPDATE blog_posts SET slug=?, title=?, excerpt=?, content=?, cover_image=?, status=?, published_at=? WHERE id=?`
  ).run(input.slug, input.title, input.excerpt, input.content, input.cover_image, input.status, input.published_at, id);
}

export function deleteBlogPost(id: number): void {
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);
}
