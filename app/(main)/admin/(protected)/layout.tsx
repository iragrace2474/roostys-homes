import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { logout } from '@/lib/actions/auth';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/rooms', label: 'Rooms' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/blog', label: 'Events & Blog' },
];

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-forest-50">
      <aside className="hidden w-60 flex-col bg-forest-900 px-5 py-8 text-forest-100 sm:flex">
        <span className="font-display text-lg font-semibold text-yellow-200">Roosty&apos;s Admin</span>
        <nav className="mt-8 flex flex-col gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-forest-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-8">
          <Link href="/" className="text-sm text-forest-300 hover:text-yellow-200">
            &larr; View site
          </Link>
          <form action={logout}>
            <button type="submit" className="text-sm text-forest-300 hover:text-yellow-200">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-forest-100 bg-white px-6 py-4 sm:hidden">
          <span className="font-display font-semibold text-forest-900">Roosty&apos;s Admin</span>
          <form action={logout}>
            <button type="submit" className="text-sm text-forest-700">
              Sign out
            </button>
          </form>
        </header>
        <nav className="flex gap-4 overflow-x-auto border-b border-forest-100 bg-white px-6 py-3 text-sm font-medium sm:hidden">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-forest-800">
              {link.label}
            </Link>
          ))}
        </nav>
        <main className="p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
