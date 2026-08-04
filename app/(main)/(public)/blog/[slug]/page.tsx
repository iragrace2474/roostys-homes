import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/db';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return { title: post ? `${post.title} — Roosty's Homes` : "Blog — Roosty's Homes" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || post.status !== 'published') notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {post.published_at && (
        <p className="text-sm font-semibold tracking-wide text-forest-600 uppercase">
          {new Date(post.published_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      )}
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">{post.title}</h1>

      {post.cover_image && (
        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-2xl">
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="mt-8 leading-relaxed whitespace-pre-wrap text-ink-soft">{post.content}</div>
    </article>
  );
}
