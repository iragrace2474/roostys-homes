import { createRoomAction } from '@/lib/actions/rooms';
import RoomForm from '../room-form';

export default function NewRoomPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">New Room</h1>
      <div className="mt-6">
        <RoomForm action={createRoomAction} />
      </div>
    </div>
  );
}
