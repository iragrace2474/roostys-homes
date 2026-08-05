import type { Metadata } from 'next';

export const metadata: Metadata = { title: "Our Location — Roosty's Homes" };

const ADDRESS = 'Ruharo Nkokonjeru, Mbarara City, Uganda';
// Search by business name (it's a registered Google Maps listing), not just
// the address text — searching the plain address only geocodes the general
// area and can surface an unrelated nearby landmark instead of the actual
// pin.
const MAP_QUERY = encodeURIComponent(`Roosty's Homes, ${ADDRESS}`);

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Find Us</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Our Location</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Roosty&apos;s Homes sits in Ruharo Nkokonjeru, Mbarara City — easy to find, with secure parking on
        arrival. Use the live map below to get directions from wherever you&apos;re starting.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-forest-100">
        <iframe
          title="Roosty's Homes location"
          src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
          className="h-[480px] w-full border-0 sm:h-[560px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
          <h2 className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Address</h2>
          <p className="mt-2 text-ink">{ADDRESS}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
          <h2 className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Call Us</h2>
          <p className="mt-2 text-ink">
            <a href="tel:+256707113630" className="hover:text-forest-700">+256 707 113630</a>
            <br />
            <a href="tel:+256768640830" className="hover:text-forest-700">+256 768 640830</a>
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl bg-forest-800 p-6 text-center">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-yellow-300 px-6 py-3 font-semibold text-forest-900 transition hover:bg-yellow-200"
          >
            Get Directions
          </a>
          <a
            href={`https://www.google.com/maps?q=${MAP_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
