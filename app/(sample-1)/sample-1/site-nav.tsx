'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <ul className="site-menu js-clone-nav d-none d-lg-block">
      <li className={pathname === '/sample-1' ? 'active' : undefined}>
        <Link href="/sample-1">Home</Link>
      </li>
      <li className={`has-children${pathname === '/sample-1/rooms' ? ' active' : ''}`}>
        <Link href="/sample-1/rooms">Rooms</Link>
        <ul className="dropdown arrow-top">
          <li><Link href="/sample-1/rooms">Standard Room</Link></li>
          <li><Link href="/sample-1/rooms">Family Room</Link></li>
          <li><Link href="/sample-1/rooms">Single Room</Link></li>
          <li className="has-children">
            <Link href="/sample-1/rooms">Rooms</Link>
            <ul className="dropdown">
              <li><Link href="/sample-1/rooms">America</Link></li>
              <li><Link href="/sample-1/rooms">Europe</Link></li>
              <li><Link href="/sample-1/rooms">Asia</Link></li>
              <li><Link href="/sample-1/rooms">Africa</Link></li>
            </ul>
          </li>
        </ul>
      </li>
      <li className={pathname === '/sample-1/events' ? 'active' : undefined}>
        <Link href="/sample-1/events">Events</Link>
      </li>
      <li className={pathname === '/sample-1/about' ? 'active' : undefined}>
        <Link href="/sample-1/about">About</Link>
      </li>
      <li className={pathname === '/sample-1/contact' ? 'active' : undefined}>
        <Link href="/sample-1/contact">Contact</Link>
      </li>
    </ul>
  );
}
