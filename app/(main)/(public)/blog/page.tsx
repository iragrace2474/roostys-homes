import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { listBlogPosts } from '@/lib/db';

export const metadata: Metadata = { title: "Blog & Events — Roosty's Homes" };

export default function BlogListPage() {
  const posts = listBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">News</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Blog &amp; Events</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">Updates, events and news from Roosty&apos;s Homes.</p>

      {posts.length === 0 ? (
        <p className="mt-14 text-ink-soft">Nothing posted yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100"
            >
              {post.cover_image && (
                <div className="relative h-44 w-full">
                  <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                {post.published_at && (
                  <p className="text-xs font-semibold tracking-wide text-forest-600 uppercase">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}
                <h2 className="mt-1 font-display text-lg font-semibold text-forest-900">{post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
