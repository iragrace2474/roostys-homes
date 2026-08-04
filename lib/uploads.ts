import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

// Deliberately NOT under public/ — this Next.js version caches the app
// router's not-found response in a way that shadows newly-added public/
// files at runtime (confirmed: brand-new files under an already-working
// public/ subfolder still 404 with `x-nextjs-cache: HIT` even across full
// rebuilds). Uploaded images are stored here and served through the
// app/(main)/uploads/[filename]/route.ts Route Handler instead, which reads
// them from disk on every request and is unaffected by that caching layer.
const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

// Saves an uploaded image (from a <input type="file"> in a Server Action's
// FormData) and returns its public URL path (served by the uploads Route
// Handler), or null if no file was provided. Used by the admin
// rooms/services/blog forms.
export async function saveUploadedImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error(`Unsupported image type: ${file.type || 'unknown'}`);
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

export function uploadFilePath(filename: string): string {
  return path.join(UPLOAD_DIR, filename);
}
