'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <ul className="site-menu js-clone-nav d-none d-lg-block">
      <li className={pathname === '/' ? 'active' : undefined}>
        <Link href="/">Home</Link>
      </li>
      <li className={`has-children${pathname === '/rooms' ? ' active' : ''}`}>
        <Link href="/rooms">Rooms</Link>
        <ul className="dropdown arrow-top">
          <li><Link href="/rooms">Standard Room</Link></li>
          <li><Link href="/rooms">Family Room</Link></li>
          <li><Link href="/rooms">Single Room</Link></li>
          <li className="has-children">
            <Link href="/rooms">Rooms</Link>
            <ul className="dropdown">
              <li><Link href="/rooms">America</Link></li>
              <li><Link href="/rooms">Europe</Link></li>
              <li><Link href="/rooms">Asia</Link></li>
              <li><Link href="/rooms">Africa</Link></li>
            </ul>
          </li>
        </ul>
      </li>
      <li className={pathname === '/events' ? 'active' : undefined}>
        <Link href="/events">Events</Link>
      </li>
      <li className={pathname === '/about' ? 'active' : undefined}>
        <Link href="/about">About</Link>
      </li>
      <li className={pathname === '/contact' ? 'active' : undefined}>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
