import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { listRooms } from '@/lib/db';
import ReviewsSection from './reviews-section';

export const metadata: Metadata = { title: "Rooms & Cottages — Roosty's Homes" };

export default function RoomsPage() {
  const rooms = listRooms();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Where to Stay</span>
        <h1 className="mt-2 text-4xl font-semibold text-forest-900">Rooms &amp; Cottages</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Choose the room that fits your stay — from a cozy one-bedroom to a full family suite.
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.slug}`}
            className="group relative block h-[36rem] overflow-hidden transition"
          >
            {room.images[0] && (
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-display text-xl font-semibold text-white">{room.name}</h2>
              <p className="mt-1 text-sm text-forest-100">
                {room.max_guests} guests &middot; {room.size_sqm} sqm
              </p>
              <p className="mt-3 text-lg font-semibold text-yellow-300">
                UGX {room.price.toLocaleString()}{' '}
                <span className="text-sm font-normal text-forest-100">{room.price_unit}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <ReviewsSection roomNames={rooms.map((r) => r.name)} />
      </div>
    </div>
  );
}
