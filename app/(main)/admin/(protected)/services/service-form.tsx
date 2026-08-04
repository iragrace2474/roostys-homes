import type { Service } from '@/lib/db';

export default function ServiceForm({
  service,
  action,
}: {
  service?: Service;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="grid max-w-xl gap-4">
      {service && <input type="hidden" name="id" value={service.id} />}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-forest-900">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={service?.name}
          required
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-semibold text-forest-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={service?.description}
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="sort_order" className="mb-1 block text-sm font-semibold text-forest-900">
          Sort order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={service?.sort_order ?? 0}
          className="w-40 rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-semibold text-forest-900">
          Photo {service && <span className="font-normal text-ink-soft">(leave blank to keep current)</span>}
        </label>
        <input id="image" name="image" type="file" accept="image/*" className="w-full text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-forest-900">
        <input type="checkbox" name="active" defaultChecked={service ? service.active === 1 : true} />
        Visible on the public site
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
      >
        {service ? 'Save changes' : 'Create service'}
      </button>
    </form>
  );
}
