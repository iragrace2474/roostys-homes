import type { Metadata } from 'next';
import { listServices } from '@/lib/db';
import ServiceSlideshow from './service-slideshow';

export const metadata: Metadata = { title: "Services — Roosty's Homes" };

// Frontend-only extra photos per service, shown as a slow crossfade slideshow
// on the card instead of a single static photo. Falls back to just the DB
// `image` for services without an entry here (or when they have no image at
// all). Add more paths as real photos come in — Kids' Play Area and Pool
// Table don't have extra shots yet.
const SERVICE_GALLERY: Record<string, string[]> = {
  'bar-restaurant': [
    '/roosty-photos/real/restaurant-01.jpg',
    '/roosty-photos/real/bar-garden-wide-01.jpg',
    '/roosty-photos/real/bar-garden-wide-02.jpg',
  ],
  'party-gardens': [
    '/roosty-photos/real/exterior-01.jpg',
    '/roosty-photos/real/garden-path-01.jpg',
    '/roosty-photos/real/garden-path-02.jpg',
    '/roosty-photos/real/garden-path-03.jpg',
  ],
  'room-service': [
    '/roosty-photos/real/kitchen-01.jpg',
    '/roosty-photos/real/kitchen-microwave.jpg',
    '/roosty-photos/real/kitchen-stove.jpg',
  ],
  'cocktails-fresh-juice': ['/roosty-photos/real/kitchen-bar.jpg', '/roosty-photos/real/restaurant-01.jpg'],
  'car-parking': ['/roosty-photos/real/bar-garden-wide-02.jpg', '/roosty-photos/real/bar-garden-wide-01.jpg'],
  'secure-premises': [
    '/roosty-photos/real/security-wall-01.jpg',
    '/roosty-photos/real/security-wall-02.jpg',
  ],
};

export default function ServicesPage() {
  const services = listServices();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">On the Premises</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Services</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Everything we offer at Roosty&apos;s Homes, beyond a place to stay.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {services.map((service) => {
          const images = SERVICE_GALLERY[service.slug] ?? (service.image ? [service.image] : []);
          return (
            <div key={service.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100">
              {images.length > 0 && (
                <div className="relative h-52 w-full overflow-hidden bg-forest-100">
                  <ServiceSlideshow images={images} alt={service.name} />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">{service.name}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
