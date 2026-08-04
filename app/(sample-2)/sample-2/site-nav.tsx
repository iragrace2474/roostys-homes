'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/sample-2', label: 'Home' },
  { href: '/sample-2/rooms', label: 'Rooms' },
  { href: '/sample-2/about', label: 'About' },
  { href: '/sample-2/events', label: 'Events' },
  { href: '/sample-2/contact', label: 'Contact' },
];

// Rendered once in the persistent header. ThemeRuntime's onceInit() converts
// this into a slicknav off-canvas menu (targeting id="navigation") on first
// load — it must not be re-mounted per navigation, or slicknav would be
// initialized on it twice.
export default function SiteNav() {
  const pathname = usePathname();

  return (
    <ul id="navigation">
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={pathname === href ? 'active' : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
