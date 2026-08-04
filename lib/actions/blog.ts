'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../auth';
import { createBlogPost, deleteBlogPost, getBlogPostById, updateBlogPost, type BlogPostStatus } from '../db';
import { saveUploadedImage } from '../uploads';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readPostFields(formData: FormData) {
  const status: BlogPostStatus = formData.get('status') === 'published' ? 'published' : 'draft';
  return {
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    status,
  };
}

export async function createBlogPostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const fields = readPostFields(formData);
  if (!fields.title) throw new Error('Post title is required.');
  const uploaded = await saveUploadedImage(formData.get('cover_image') as File | null);

  createBlogPost({
    slug: slugify(fields.title),
    ...fields,
    cover_image: uploaded,
    published_at: fields.status === 'published' ? new Date().toISOString() : null,
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const existing = getBlogPostById(id);
  if (!existing) throw new Error('Post not found.');

  const fields = readPostFields(formData);
  const uploaded = await saveUploadedImage(formData.get('cover_image') as File | null);
  const wasPublished = existing.status === 'published';

  updateBlogPost(id, {
    slug: existing.slug,
    ...fields,
    cover_image: uploaded ?? existing.cover_image,
    // Set published_at the first time a post goes live; keep the original
    // date on later edits instead of bumping it.
    published_at:
      fields.status === 'published' ? existing.published_at ?? new Date().toISOString() : wasPublished ? existing.published_at : null,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  deleteBlogPost(id);
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
