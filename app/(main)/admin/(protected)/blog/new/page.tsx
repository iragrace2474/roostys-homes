import { createBlogPostAction } from '@/lib/actions/blog';
import PostForm from '../post-form';

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">New Post</h1>
      <div className="mt-6">
        <PostForm action={createBlogPostAction} />
      </div>
    </div>
  );
}
