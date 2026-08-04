import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { listRooms } from '@/lib/db';

export const metadata: Metadata = { title: "Rooms & Cottages — Roosty's Homes" };

export default function RoomsPage() {
  const rooms = listRooms();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Where to Stay</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Rooms &amp; Cottages</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Choose the room that fits your stay — from a cozy one-bedroom to a full family suite.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100 transition hover:shadow-md"
          >
            <div className="relative h-64 w-full overflow-hidden">
              {room.images[0] && (
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-forest-900">{room.name}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {room.max_guests} guests &middot; {room.size_sqm} sqm
              </p>
              <p className="mt-3 text-lg font-semibold text-forest-800">
                UGX {room.price.toLocaleString()}{' '}
                <span className="text-sm font-normal text-ink-soft">{room.price_unit}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
