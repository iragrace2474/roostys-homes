import type { BlogPost } from '@/lib/db';

export default function PostForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="grid max-w-2xl gap-4">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-semibold text-forest-900">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={post?.title}
          required
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm font-semibold text-forest-900">
          Excerpt <span className="font-normal text-ink-soft">(short summary shown on the blog list)</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-semibold text-forest-900">Content</label>
        <textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={post?.content}
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="cover_image" className="mb-1 block text-sm font-semibold text-forest-900">
          Cover photo {post && <span className="font-normal text-ink-soft">(leave blank to keep current)</span>}
        </label>
        <input id="cover_image" name="cover_image" type="file" accept="image/*" className="w-full text-sm" />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-sm font-semibold text-forest-900">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={post?.status ?? 'draft'}
          className="w-48 rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-yellow-100 hover:bg-forest-700"
      >
        {post ? 'Save changes' : 'Create post'}
      </button>
    </form>
  );
}
