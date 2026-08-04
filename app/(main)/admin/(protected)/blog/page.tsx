import Link from 'next/link';
import { listBlogPosts } from '@/lib/db';
import { deleteBlogPostAction } from '@/lib/actions/blog';

export default function AdminBlogPage() {
  const posts = listBlogPosts(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-ink-soft">No posts yet.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100">
              <div>
                <p className="font-semibold text-forest-900">
                  {post.title}{' '}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      post.status === 'published' ? 'bg-forest-100 text-forest-800' : 'bg-ink-soft/10 text-ink-soft'
                    }`}
                  >
                    {post.status}
                  </span>
                </p>
                <p className="text-sm text-ink-soft">{post.excerpt}</p>
              </div>
              <div className="flex gap-3">
                <Link href={`/admin/blog/${post.id}`} className="text-sm font-semibold text-forest-800 hover:text-forest-600">
                  Edit
                </Link>
                <form action={deleteBlogPostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="text-sm font-semibold text-red-700 hover:text-red-600">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
