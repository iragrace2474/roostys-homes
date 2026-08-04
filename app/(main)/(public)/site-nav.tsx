'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                active ? 'text-forest-800' : 'text-ink-soft hover:text-forest-800'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/book"
        className="hidden rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-yellow-100 shadow-sm transition hover:bg-forest-700 md:inline-block"
      >
        Book Now
      </Link>

      <div className="md:hidden">
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-forest-200"
        >
          <span className={`block h-0.5 w-5 bg-forest-800 transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-forest-800 transition ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-forest-800 transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        {open && (
          <div className="absolute inset-x-0 top-full border-t border-forest-100 bg-paper shadow-lg">
            <nav className="flex flex-col px-6 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-forest-100 py-3 font-medium last:border-none ${
                    pathname === link.href ? 'text-forest-800' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-forest-800 px-5 py-3 text-center font-semibold text-yellow-100"
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
