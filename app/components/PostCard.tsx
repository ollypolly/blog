import Link from 'next/link';
import { Post } from '../lib/posts';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/${post.slug}`}>
      <article className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {post.title}
        </h2>
        <time className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 block">
          {formattedDate}
        </time>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.spoiler}
        </p>
      </article>
    </Link>
  );
};