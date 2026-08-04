import Link from 'next/link';
import { listBookings, listRooms, listServices, listBlogPosts } from '@/lib/db';

export default function AdminDashboardPage() {
  const pending = listBookings('pending');
  const confirmed = listBookings('confirmed');
  const rooms = listRooms(false);
  const services = listServices(false);
  const posts = listBlogPosts(false);

  const cards = [
    { label: 'Pending requests', value: pending.length, href: '/admin/bookings', accent: true },
    { label: 'Confirmed bookings', value: confirmed.length, href: '/admin/bookings' },
    { label: 'Rooms', value: rooms.length, href: '/admin/rooms' },
    { label: 'Services', value: services.length, href: '/admin/services' },
    { label: 'Blog posts', value: posts.length, href: '/admin/blog' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-2xl p-6 shadow-sm ring-1 transition hover:shadow-md ${
              card.accent ? 'bg-yellow-100 ring-yellow-200' : 'bg-white ring-forest-100'
            }`}
          >
            <p className="text-3xl font-semibold text-forest-900">{card.value}</p>
            <p className="mt-1 text-sm font-medium text-ink-soft">{card.label}</p>
          </Link>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-semibold text-forest-900">Needs your attention</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {pending.length} booking request{pending.length === 1 ? '' : 's'} waiting to be confirmed or
            declined.
          </p>
          <Link
            href="/admin/bookings"
            className="mt-4 inline-block rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
          >
            Review requests &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
