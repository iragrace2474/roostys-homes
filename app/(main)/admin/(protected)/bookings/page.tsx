import { listBookings, getRoomById, type Booking, type BookingStatus } from '@/lib/db';
import { confirmBooking, declineBooking } from '@/lib/actions/bookings';

function BookingCard({ booking }: { booking: Booking }) {
  const room = getRoomById(booking.room_id);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg font-semibold text-forest-900">{booking.guest_name}</p>
          <p className="text-sm text-ink-soft">
            {room?.name ?? 'Unknown room'} &middot; {booking.check_in} &rarr; {booking.check_out} &middot;{' '}
            {booking.guests_count} guest{booking.guests_count === 1 ? '' : 's'}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            <a href={`tel:${booking.guest_phone}`} className="hover:text-forest-700">{booking.guest_phone}</a>
            {' · '}
            <a href={`mailto:${booking.guest_email}`} className="hover:text-forest-700">{booking.guest_email}</a>
          </p>
          {booking.message && <p className="mt-2 text-sm text-ink-soft italic">&ldquo;{booking.message}&rdquo;</p>}
        </div>

        {booking.status === 'pending' ? (
          <div className="flex gap-2">
            <form action={confirmBooking}>
              <input type="hidden" name="id" value={booking.id} />
              <button
                type="submit"
                className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
              >
                Confirm
              </button>
            </form>
            <form action={declineBooking}>
              <input type="hidden" name="id" value={booking.id} />
              <button
                type="submit"
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                Decline
              </button>
            </form>
          </div>
        ) : (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase ${
              booking.status === 'confirmed' ? 'bg-forest-100 text-forest-800' : 'bg-red-50 text-red-700'
            }`}
          >
            {booking.status}
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ title, bookings }: { title: string; bookings: Booking[] }) {
  if (bookings.length === 0) return null;
  return (
    <div className="mt-8 first:mt-0">
      <h2 className="font-display text-lg font-semibold text-forest-900">{title}</h2>
      <div className="mt-4 grid gap-4">
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
}

export default function AdminBookingsPage() {
  const all = listBookings();
  const byStatus = (status: BookingStatus) => all.filter((b) => b.status === status);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Bookings</h1>

      {all.length === 0 ? (
        <p className="mt-6 text-ink-soft">No booking requests yet.</p>
      ) : (
        <>
          <Section title="Pending" bookings={byStatus('pending')} />
          <Section title="Confirmed" bookings={byStatus('confirmed')} />
          <Section title="Declined" bookings={byStatus('declined')} />
        </>
      )}
    </div>
  );
}
