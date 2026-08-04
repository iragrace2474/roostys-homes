'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../auth';
import { createRoom, deleteRoom, getRoomById, updateRoom } from '../db';
import { saveUploadedImage } from '../uploads';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readRoomFields(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    price: Number(formData.get('price') ?? 0),
    price_unit: String(formData.get('price_unit') ?? 'per night').trim() || 'per night',
    max_guests: Number(formData.get('max_guests') ?? 1),
    size_sqm: formData.get('size_sqm') ? Number(formData.get('size_sqm')) : null,
    sort_order: Number(formData.get('sort_order') ?? 0),
    active: formData.get('active') ? 1 : (0 as 0 | 1),
    quantity: Math.max(1, Number(formData.get('quantity') ?? 1)),
  };
}

export async function createRoomAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const fields = readRoomFields(formData);
  if (!fields.name || !fields.price) {
    throw new Error('Room name and price are required.');
  }
  const uploaded = await saveUploadedImage(formData.get('image') as File | null);

  createRoom({
    slug: slugify(fields.name),
    ...fields,
    images: uploaded ? [uploaded] : [],
  });

  revalidatePath('/rooms');
  revalidatePath('/admin/rooms');
  redirect('/admin/rooms');
}

export async function updateRoomAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const existing = getRoomById(id);
  if (!existing) throw new Error('Room not found.');

  const fields = readRoomFields(formData);
  const uploaded = await saveUploadedImage(formData.get('image') as File | null);

  updateRoom(id, {
    slug: existing.slug,
    ...fields,
    // Only replace photos if a new one was actually uploaded — otherwise
    // keep the existing gallery so editing price/description doesn't wipe it.
    images: uploaded ? [uploaded] : existing.images,
  });

  revalidatePath('/rooms');
  revalidatePath(`/rooms/${existing.slug}`);
  revalidatePath('/admin/rooms');
  redirect('/admin/rooms');
}

export async function deleteRoomAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  deleteRoom(id);
  revalidatePath('/rooms');
  revalidatePath('/admin/rooms');
}
