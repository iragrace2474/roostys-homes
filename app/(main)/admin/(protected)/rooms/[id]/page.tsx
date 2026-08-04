import { notFound } from 'next/navigation';
import { getRoomById } from '@/lib/db';
import { updateRoomAction } from '@/lib/actions/rooms';
import RoomForm from '../room-form';

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = getRoomById(Number(id));
  if (!room) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Edit Room</h1>
      <div className="mt-6">
        <RoomForm room={room} action={updateRoomAction} />
      </div>
    </div>
  );
}
