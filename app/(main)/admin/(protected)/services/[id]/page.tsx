import { notFound } from 'next/navigation';
import { getServiceById } from '@/lib/db';
import { updateServiceAction } from '@/lib/actions/services';
import ServiceForm from '../service-form';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceById(Number(id));
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Edit Service</h1>
      <div className="mt-6">
        <ServiceForm service={service} action={updateServiceAction} />
      </div>
    </div>
  );
}
