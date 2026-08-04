import Link from 'next/link';
import { listServices } from '@/lib/db';
import { deleteServiceAction } from '@/lib/actions/services';

export default function AdminServicesPage() {
  const services = listServices(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
        >
          + New Service
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100">
            <div>
              <p className="font-semibold text-forest-900">
                {service.name}{' '}
                {service.active === 0 && (
                  <span className="ml-2 rounded-full bg-ink-soft/10 px-2 py-0.5 text-xs text-ink-soft">Hidden</span>
                )}
              </p>
              <p className="text-sm text-ink-soft">{service.description}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/services/${service.id}`} className="text-sm font-semibold text-forest-800 hover:text-forest-600">
                Edit
              </Link>
              <form action={deleteServiceAction}>
                <input type="hidden" name="id" value={service.id} />
                <button type="submit" className="text-sm font-semibold text-red-700 hover:text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
