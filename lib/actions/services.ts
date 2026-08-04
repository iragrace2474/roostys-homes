'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../auth';
import { createService, deleteService, getServiceById, updateService } from '../db';
import { saveUploadedImage } from '../uploads';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readServiceFields(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    sort_order: Number(formData.get('sort_order') ?? 0),
    active: formData.get('active') ? 1 : (0 as 0 | 1),
  };
}

export async function createServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const fields = readServiceFields(formData);
  if (!fields.name) throw new Error('Service name is required.');
  const uploaded = await saveUploadedImage(formData.get('image') as File | null);

  createService({
    slug: slugify(fields.name),
    ...fields,
    image: uploaded,
  });

  revalidatePath('/services');
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

export async function updateServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const existing = getServiceById(id);
  if (!existing) throw new Error('Service not found.');

  const fields = readServiceFields(formData);
  const uploaded = await saveUploadedImage(formData.get('image') as File | null);

  updateService(id, {
    slug: existing.slug,
    ...fields,
    image: uploaded ?? existing.image,
  });

  revalidatePath('/services');
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  deleteService(id);
  revalidatePath('/services');
  revalidatePath('/admin/services');
}
