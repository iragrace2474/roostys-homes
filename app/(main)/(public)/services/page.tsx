import Image from 'next/image';
import type { Metadata } from 'next';
import { listServices } from '@/lib/db';

export const metadata: Metadata = { title: "Services — Roosty's Homes" };

export default function ServicesPage() {
  const services = listServices();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">On the Premises</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Services</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Everything on offer at Roosty&apos;s Homes, beyond a place to stay.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100">
            {service.image && (
              <div className="relative h-52 w-full">
                <Image src={service.image} alt={service.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-forest-900">{service.name}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
