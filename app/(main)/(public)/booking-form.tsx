'use client';

import { useActionState, useState } from 'react';
import { submitBooking, type BookingFormState } from '@/lib/actions/bookings';
import BookingCalendar, { type DateRange } from './booking-calendar';

export type RoomOption = {
  id: number;
  slug: string;
  name: string;
  price: number;
  price_unit: string;
  disabledRanges: DateRange[];
  /** Frontend-only: names of individually-named units (e.g. cottages) for
   * the guest to pick a preference from. Folded into the submitted message
   * — there's no dedicated backend field for it. */
  unitNames?: string[];
};

const initialState: BookingFormState = {};

export default function BookingForm({
  rooms,
  initialRoomId,
}: {
  rooms: RoomOption[];
  initialRoomId?: number;
}) {
  const [roomId, setRoomId] = useState(initialRoomId ?? rooms[0]?.id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [preferredUnit, setPreferredUnit] = useState('');
  const [note, setNote] = useState('');
  const [state, formAction, pending] = useActionState(submitBooking, initialState);

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];

  // There's no backend field for "which named cottage" — fold it into the
  // free-text message the admin already sees, rather than adding one.
  const combinedMessage = preferredUnit
    ? `Preferred cottage: ${preferredUnit}${note ? `\n\n${note}` : ''}`
    : note;

  if (!room) {
    return <p className="text-ink-soft">No rooms are available to book right now.</p>;
  }

  if (state.success) {
    return (
      <div className="rounded-2xl bg-forest-50 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-forest-900">Request received!</h3>
        <p className="mt-2 text-ink-soft">
          Thank you — we&apos;ve received your booking request and will confirm it with you shortly by
          phone or email.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-2">
      <input type="hidden" name="room_id" value={room.id} />
      <input type="hidden" name="check_in" value={checkIn} />
      <input type="hidden" name="check_out" value={checkOut} />
      <input type="hidden" name="message" value={combinedMessage} />

      <div>
        {rooms.length > 1 && (
          <div className="mb-6">
            <label htmlFor="room-select" className="mb-1 block text-sm font-semibold text-forest-900">
              Room
            </label>
            <select
              id="room-select"
              value={room.id}
              onChange={(e) => {
                setRoomId(Number(e.target.value));
                setCheckIn('');
                setCheckOut('');
                setPreferredUnit('');
              }}
              className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 text-ink"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — UGX {r.price.toLocaleString()} {r.price_unit}
                </option>
              ))}
            </select>
          </div>
        )}
        <BookingCalendar
          disabledRanges={room.disabledRanges}
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(a, b) => {
            setCheckIn(a);
            setCheckOut(b);
          }}
        />
      </div>

      <div className="grid content-start gap-4">
        <div>
          <label htmlFor="guest_name" className="mb-1 block text-sm font-semibold text-forest-900">
            Full name
          </label>
          <input
            id="guest_name"
            name="guest_name"
            required
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="guest_email" className="mb-1 block text-sm font-semibold text-forest-900">
              Email
            </label>
            <input
              id="guest_email"
              name="guest_email"
              type="email"
              required
              className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
            />
          </div>
          <div>
            <label htmlFor="guest_phone" className="mb-1 block text-sm font-semibold text-forest-900">
              Phone
            </label>
            <input
              id="guest_phone"
              name="guest_phone"
              required
              className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
            />
          </div>
        </div>
        <div>
          <label htmlFor="guests_count" className="mb-1 block text-sm font-semibold text-forest-900">
            Number of guests
          </label>
          <input
            id="guests_count"
            name="guests_count"
            type="number"
            min={1}
            defaultValue={1}
            required
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
        {room.unitNames && room.unitNames.length > 0 && (
          <div>
            <label htmlFor="preferred_unit" className="mb-1 block text-sm font-semibold text-forest-900">
              Which cottage would you like?
            </label>
            <select
              id="preferred_unit"
              value={preferredUnit}
              onChange={(e) => setPreferredUnit(e.target.value)}
              className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 text-ink"
            >
              <option value="">No preference — any available cottage</option>
              {room.unitNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-semibold text-forest-900">
            Anything else we should know? (optional)
          </label>
          <textarea
            id="message"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>

        {state.error && <p className="text-sm font-medium text-red-700">{state.error}</p>}

        <button
          type="submit"
          disabled={pending || !checkIn || !checkOut}
          className="mt-2 rounded-full bg-forest-800 px-7 py-3 font-semibold text-yellow-100 transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? 'Sending request…' : 'Request Booking'}
        </button>
      </div>
    </form>
  );
}
