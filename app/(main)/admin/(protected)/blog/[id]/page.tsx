import { notFound } from 'next/navigation';
import { getBlogPostById } from '@/lib/db';
import { updateBlogPostAction } from '@/lib/actions/blog';
import PostForm from '../post-form';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Edit Post</h1>
      <div className="mt-6">
        <PostForm post={post} action={updateBlogPostAction} />
      </div>
    </div>
  );
}
