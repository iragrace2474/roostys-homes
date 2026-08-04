import type { Metadata } from 'next';

export const metadata: Metadata = { title: "Contact — Roosty's Homes" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Get in Touch</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Contact Us</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
            <h2 className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Address</h2>
            <p className="mt-2 text-ink">Ruharo Nkokonjeru, Mbarara City, Uganda</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
            <h2 className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Phone</h2>
            <p className="mt-2 text-ink">
              <a href="tel:+256707113630" className="hover:text-forest-700">+256 707 113630</a>
              <br />
              <a href="tel:+256768640830" className="hover:text-forest-700">+256 768 640830</a>
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
            <h2 className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Email</h2>
            <p className="mt-2 text-ink">
              <a href="mailto:info@roostyshomes.com" className="hover:text-forest-700">info@roostyshomes.com</a>
              <br />
              <a href="mailto:roostyshomes@gmail.com" className="hover:text-forest-700">roostyshomes@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl ring-1 ring-forest-100">
          <iframe
            title="Roosty's Homes location"
            src="https://www.google.com/maps?q=Ruharo+Nkokonjeru,+Mbarara+City&output=embed"
            className="h-full min-h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
