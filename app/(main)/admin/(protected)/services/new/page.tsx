import { createServiceAction } from '@/lib/actions/services';
import ServiceForm from '../service-form';

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">New Service</h1>
      <div className="mt-6">
        <ServiceForm action={createServiceAction} />
      </div>
    </div>
  );
}
