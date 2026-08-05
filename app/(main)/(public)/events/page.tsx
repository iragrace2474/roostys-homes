import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { listBlogPosts } from '@/lib/db';

export const metadata: Metadata = { title: "Events & Blog — Roosty's Homes" };

function DateBadge({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr);
  return (
    <div className="absolute top-4 left-4 flex w-14 flex-col items-center rounded-xl bg-white/95 py-2 shadow-sm">
      <span className="text-xl leading-none font-semibold text-forest-900">{d.getDate()}</span>
      <span className="mt-0.5 text-[11px] font-semibold tracking-wide text-forest-600 uppercase">
        {d.toLocaleDateString('en-US', { month: 'short' })}
      </span>
    </div>
  );
}

export default function EventsPage() {
  const posts = listBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">What&apos;s Happening</span>
      <h1 className="mt-2 text-4xl font-semibold text-forest-900">Events &amp; Blog</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Live music nights, holiday specials, weddings and functions in our party gardens, and news from
        around Roosty&apos;s Homes.
      </p>

      {posts.length === 0 ? (
        <p className="mt-14 text-ink-soft">Nothing posted yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/events/${post.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100 transition hover:shadow-md"
            >
              <div className="relative h-44 w-full bg-forest-50">
                {post.cover_image && (
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
                {post.published_at && <DateBadge dateStr={post.published_at} />}
              </div>
              <div className="p-6">
                <h2 className="font-display text-lg font-semibold text-forest-900">{post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-16 rounded-2xl bg-forest-800 px-8 py-10 text-center">
        <h2 className="text-2xl font-semibold text-white">Planning a Wedding, Party or Function?</h2>
        <p className="mx-auto mt-2 max-w-xl text-forest-100">
          Our party gardens are available to hire, with space for tents, seating and catering — get in
          touch and let&apos;s plan your event.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-yellow-300 px-7 py-3 font-semibold text-forest-900 transition hover:bg-yellow-200"
        >
          Enquire About Your Event
        </Link>
      </div>
    </div>
  );
}
