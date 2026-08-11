import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRoomBySlug, listFullyBookedRanges } from '@/lib/db';
import BookingForm from '../../booking-form';
import { ROOM_UNIT_NAMES, unitNounFor } from '../../room-unit-names';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  return { title: room ? `${room.name} — Roosty's Homes` : "Room — Roosty's Homes" };
}

// Frontend-only presentational bullet points, separate from the DB
// `description` field (which stays the single editable summary/SEO text).
// Add an entry per room slug for the nicer feature-grid layout below — rooms
// without one just show the plain description paragraph.
const ROOM_FEATURES: Record<string, string[]> = {
  'one-bedroom-occupancy': [
    'Queen-size bed',
    'Side wardrobe',
    'Dressing mirror',
    'Spacious en-suite bathroom',
  ],
};

// Frontend-only labels for the numbered-unit photo cards below (as opposed
// to the flat named-pill list used for e.g. cottages). Falls back to
// auto-numbered "Room 1", "Room 2", ... when a slug has no entry — set one
// here when the real rooms use different numbers (e.g. Room 5 and Room 6).
const ROOM_UNIT_LABELS: Record<string, string[]> = {
  'two-bedroom-occupancy': ['Room 5', 'Room 6'],
  'two-bedroom-occupancy-3-4': ['Room 3', 'Room 4'],
};

// Frontend-only per-unit badge text, for when the units *aren't* identical.
// Falls back to "Same layout" when a slug has no entry, or when an index has
// no override. (Rooms 3 & 4 used to be listed here as one twin-only and one
// queen-only — corrected: both are identical two-bedroom condos.)
const ROOM_UNIT_NOTES: Record<string, string[]> = {};

// Frontend-only "Room Amenities" list, separate from ROOM_FEATURES above —
// add an entry per room slug as real amenities are confirmed.
const ROOM_AMENITIES: Record<string, string[]> = {
  'studio-room': ['DSTV', 'Smart TV', 'WiFi', 'Fully Equipped Kitchen', 'Bathroom (Water Heater Included)'],
  'one-bedroom-occupancy': ['DSTV', 'Smart TV', 'WiFi', 'Fully Equipped Kitchen', 'Bathroom (Water Heater Included)'],
  'deluxe-cottage': ['King Bed', 'Ensuite Bathroom (Bath Tub Available)', 'Air Conditioning', 'Smart TV'],
  'two-bedroom-occupancy': ['DSTV', 'Smart TV', 'WiFi', 'Fully Equipped Kitchen', 'Bathroom (Water Heater Included)'],
  'two-bedroom-occupancy-3-4': ['DSTV', 'Smart TV', 'WiFi', 'Fully Equipped Kitchen', 'Bathroom (Water Heater Included)'],
};

// Frontend-only per-unit photo sets (bedroom/living room/kitchen/bathroom)
// for the "Individual Rooms" grid below, overriding the default of reusing
// room.images for every unit. There's no real bathroom photo yet for either
// unit — PLACEHOLDER: reusing a second bedroom shot in that slot until one
// exists, per the user's explicit call to do so.
const ROOM_UNIT_IMAGES: Record<string, { label: string; src: string }[][]> = {
  'one-bedroom-occupancy': [
    [
      { label: 'Bedroom', src: '/roosty-photos/real/1bd-01.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-01.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/1bd-03.jpg' },
    ],
    [
      { label: 'Bedroom', src: '/roosty-photos/real/1bd-02.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-02.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/1bd-04.jpg' },
    ],
  ],
  // PLACEHOLDER — no real bathroom photo for this unit yet; reusing a
  // bedroom shot until a real one exists.
  'two-bedroom-occupancy': [
    [
      { label: 'Queen Bed', src: '/roosty-photos/real/1bd-01.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-01.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/1bd-05.jpg' },
    ],
    [
      { label: 'Queen Bed', src: '/roosty-photos/real/1bd-02.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-03.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/family-anna-room.jpg' },
    ],
  ],
  // Each condo has one queen-bed room and one twin-bed room, plus a shared
  // living/dining area, kitchen, and one bathroom (PLACEHOLDER — no real
  // bathroom photo yet, reusing a bedroom shot).
  'two-bedroom-occupancy-3-4': [
    [
      { label: 'Queen Bed', src: '/roosty-photos/real/1bd-03.jpg' },
      { label: 'Twin Beds', src: '/roosty-photos/real/twin-01.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-02.jpg' },
      { label: 'Dining Area', src: '/roosty-photos/real/family-dining.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/1bd-04.jpg' },
    ],
    [
      { label: 'Queen Bed', src: '/roosty-photos/real/1bd-05.jpg' },
      { label: 'Twin Beds', src: '/roosty-photos/real/twin-02.jpg' },
      { label: 'Living Room', src: '/roosty-photos/real/livingroom-04.jpg' },
      { label: 'Dining Area', src: '/roosty-photos/real/family-dining.jpg' },
      { label: 'Kitchen', src: '/roosty-photos/real/kitchen-01.jpg' },
      { label: 'Bathroom', src: '/roosty-photos/real/family-anna-room.jpg' },
    ],
  ],
};

function GuestsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
      <circle cx="10" cy="10" r="10" className="fill-forest-100" />
      <path
        d="M6 10.3l2.5 2.5L14 7.3"
        stroke="var(--color-forest-700)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room || !room.active) notFound();

  const disabledRanges = listFullyBookedRanges(room.id);
  const features = ROOM_FEATURES[room.slug];
  const amenities = ROOM_AMENITIES[room.slug];
  const unitNames = ROOM_UNIT_NAMES[room.slug];
  const unitLabels =
    ROOM_UNIT_LABELS[room.slug] ?? Array.from({ length: room.quantity }, (_, i) => `Room ${i + 1}`);
  const unitNotes = ROOM_UNIT_NOTES[room.slug];
  const unitImages = ROOM_UNIT_IMAGES[room.slug];
  const unitNoun = unitNounFor(room.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-3 sm:grid-cols-2">
        {(room.images.length > 0 ? room.images : [null]).map((src, i) =>
          src ? (
            <div key={src} className={`relative h-80 overflow-hidden rounded-2xl ${i === 0 ? 'sm:col-span-2' : ''}`}>
              <Image
                src={src}
                alt={room.name}
                fill
                className="object-cover"
                priority={i === 0}
                sizes={i === 0 ? '100vw' : '(min-width: 640px) 50vw, 100vw'}
              />
            </div>
          ) : (
            <div key="none" className="flex h-80 items-center justify-center rounded-2xl bg-forest-50 text-ink-soft">
              No photo yet
            </div>
          )
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-forest-900">{room.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
            <GuestsIcon />
            {room.max_guests} guests &middot; {room.size_sqm} sqm
          </p>
        </div>
        <p className="text-2xl font-semibold text-forest-800">
          UGX {room.price.toLocaleString()}{' '}
          <span className="text-base font-normal text-ink-soft">{room.price_unit}</span>
        </p>
      </div>

      {features ? (
        <div className="mt-8 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 rounded-xl bg-forest-50 px-4 py-3 text-sm font-medium text-ink"
              >
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 leading-relaxed text-ink-soft">{room.description}</p>
        </div>
      ) : (
        <p className="mt-6 max-w-3xl leading-relaxed text-ink-soft">{room.description}</p>
      )}

      {amenities && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-lg font-semibold text-forest-900">Room Amenities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {amenities.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 rounded-xl bg-forest-50 px-4 py-3 text-sm font-medium text-ink"
              >
                <CheckIcon />
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {room.quantity > 1 && unitNames && (
        <div className="mt-14 border-t border-forest-100 pt-12">
          <h2 className="text-2xl font-semibold text-forest-900 capitalize">
            {unitNames.length} {unitNoun}s Available
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Every {unitNoun} is the same design — pick a name you like, or leave it to us, when you book below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {unitNames.map((name) => (
              <span
                key={name}
                className="rounded-full bg-forest-50 px-5 py-2 text-sm font-semibold text-forest-800 ring-1 ring-forest-100"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {room.quantity > 1 && !unitNames && (
        <div className="mt-14 border-t border-forest-100 pt-12">
          <h2 className="text-2xl font-semibold text-forest-900">{room.quantity} Individual Rooms</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            {unitNotes
              ? 'Booked separately — if one is taken, the other may still be free.'
              : 'Identical in design and booked separately — if one is taken, the other may still be free.'}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {Array.from({ length: room.quantity }, (_, i) => {
              const photos =
                unitImages?.[i] ??
                (room.images.length > 0 ? room.images : [null, null])
                  .slice(0, 2)
                  .map((src) => ({ label: null as string | null, src }));
              return (
                <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100">
                  <div className="grid grid-cols-2 gap-0.5 bg-forest-100">
                    {photos.map((photo, j) =>
                      photo.src ? (
                        <div key={photo.src} className="relative h-36">
                          <Image
                            src={photo.src}
                            alt={photo.label ? `${room.name} — ${unitLabels[i]} — ${photo.label}` : `${room.name} — ${unitLabels[i]}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 640px) 25vw, 50vw"
                          />
                          {photo.label && (
                            <span className="absolute right-1.5 bottom-1.5 rounded bg-forest-950/70 px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase">
                              {photo.label}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div key={j} className="h-36 bg-forest-50" />
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="font-display text-lg font-semibold text-forest-900">{unitLabels[i]}</span>
                    <span className="rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-yellow-100 uppercase">
                      {unitNotes?.[i] ?? 'Same layout'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-14 border-t border-forest-100 pt-12">
        <h2 className="text-2xl font-semibold text-forest-900">Check Availability &amp; Book</h2>
        <p className="mt-2 text-ink-soft">
          Pick your dates below — we&apos;ll confirm your request by phone or email.
        </p>
        <div className="mt-8">
          <BookingForm
            rooms={[
              {
                id: room.id,
                slug: room.slug,
                name: room.name,
                price: room.price,
                price_unit: room.price_unit,
                disabledRanges,
                unitNames,
                unitNoun,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
