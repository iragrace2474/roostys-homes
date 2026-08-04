import type { Metadata } from 'next';
import { listRooms, listFullyBookedRanges } from '@/lib/db';
import BookingForm from '../booking-form';
import { ROOM_UNIT_NAMES } from '../room-unit-names';

export const metadata: Metadata = { title: "Book Now — Roosty's Homes" };

export default function BookPage() {
  const rooms = listRooms().map((room) => ({
    id: room.id,
    slug: room.slug,
    name: room.name,
    price: room.price,
    price_unit: room.price_unit,
    disabledRanges: listFullyBookedRanges(room.id),
    unitNames: ROOM_UNIT_NAMES[room.slug],
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Reserve Your Stay</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Book Now</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Choose a room and your dates below. We&apos;ll review your request and confirm it with you by
        phone or email — no payment needed to submit a request.
      </p>

      <div className="mt-10">
        <BookingForm rooms={rooms} />
      </div>
    </div>
  );
}
