import Link from 'next/link';
import Image from 'next/image';
import SiteNav from './site-nav';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative z-30 border-b border-forest-100 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/roosty-photos/web-logo-main.jpg.png"
              alt="Roosty's Homes"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
              priority
            />
            <span className="font-display text-lg font-semibold text-forest-900">Roosty&apos;s Homes</span>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-forest-900 text-forest-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-semibold text-yellow-200">Roosty&apos;s Homes</span>
            <p className="mt-3 text-sm leading-relaxed text-forest-200">
              Comfortable cottages and apartments, a lively bar and restaurant, and beautiful gardens in
              Ruharo Nkokonjeru, Mbarara City.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-yellow-200 uppercase">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/rooms" className="hover:text-yellow-200">Rooms</Link></li>
              <li><Link href="/services" className="hover:text-yellow-200">Services</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-200">Blog &amp; Events</Link></li>
              <li><Link href="/book" className="hover:text-yellow-200">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-yellow-200 uppercase">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-forest-200">
              <li>Ruharo Nkokonjeru, Mbarara City, Uganda</li>
              <li><a href="tel:+256707113630" className="hover:text-yellow-200">+256 707 113630</a></li>
              <li><a href="tel:+256768640830" className="hover:text-yellow-200">+256 768 640830</a></li>
              <li><a href="mailto:info@roostyshomes.com" className="hover:text-yellow-200">info@roostyshomes.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-yellow-200 uppercase">Find Us</h3>
            <p className="mt-3 text-sm text-forest-200">
              <a
                href="https://maps.google.com/?q=Ruharo+Nkokonjeru,+Mbarara+City"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-yellow-400/60 underline-offset-4 hover:text-yellow-200"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-forest-800 py-5 text-center text-xs text-forest-300">
          &copy; {new Date().getFullYear()} Roosty&apos;s Homes. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
