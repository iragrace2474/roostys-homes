import type { Room } from '@/lib/db';

export default function RoomForm({
  room,
  action,
}: {
  room?: Room;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="grid max-w-xl gap-4">
      {room && <input type="hidden" name="id" value={room.id} />}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-forest-900">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={room?.name}
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
          defaultValue={room?.description}
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-semibold text-forest-900">
            Price (UGX)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            defaultValue={room?.price}
            required
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="price_unit" className="mb-1 block text-sm font-semibold text-forest-900">
            Price unit
          </label>
          <input
            id="price_unit"
            name="price_unit"
            defaultValue={room?.price_unit ?? 'per night'}
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label htmlFor="max_guests" className="mb-1 block text-sm font-semibold text-forest-900">
            Max guests
          </label>
          <input
            id="max_guests"
            name="max_guests"
            type="number"
            min={1}
            defaultValue={room?.max_guests ?? 2}
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="mb-1 block text-sm font-semibold text-forest-900">
            Rooms of this type
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            defaultValue={room?.quantity ?? 1}
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
          <p className="mt-1 text-xs text-ink-soft">e.g. 2 if there&apos;s a Room 1 and Room 2</p>
        </div>
        <div>
          <label htmlFor="size_sqm" className="mb-1 block text-sm font-semibold text-forest-900">
            Size (sqm)
          </label>
          <input
            id="size_sqm"
            name="size_sqm"
            type="number"
            min={0}
            defaultValue={room?.size_sqm ?? ''}
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
            defaultValue={room?.sort_order ?? 0}
            className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-semibold text-forest-900">
          Photo {room && <span className="font-normal text-ink-soft">(leave blank to keep current photos)</span>}
        </label>
        <input id="image" name="image" type="file" accept="image/*" className="w-full text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-forest-900">
        <input type="checkbox" name="active" defaultChecked={room ? room.active === 1 : true} />
        Visible on the public site
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
      >
        {room ? 'Save changes' : 'Create room'}
      </button>
    </form>
  );
}
