import Link from 'next/link';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  spoiler?: string;
}

interface PostNavigationProps {
  previousPost: PostMeta | null;
  nextPost: PostMeta | null;
}

export default function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 sm:items-stretch">
      <div className="flex-1">
        {previousPost && (
          <Link href={`/${previousPost.slug}`} className="no-underline h-full">
            <article className="flex flex-col p-6 bg-transparent border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-200 dark:hover:border-gray-600 duration-200 cursor-pointer h-full">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 block">← Previous</span>
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 flex-1 flex items-center">
                {previousPost.title}
              </h3>
            </article>
          </Link>
        )}
      </div>
      
      <div className="flex-1">
        {nextPost && (
          <Link href={`/${nextPost.slug}`} className="no-underline h-full">
            <article className="flex flex-col p-6 bg-transparent border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-200 dark:hover:border-gray-600 duration-200 cursor-pointer text-left sm:text-right h-full">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 block">Next →</span>
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 flex-1 flex items-center sm:justify-end">
                {nextPost.title}
              </h3>
            </article>
          </Link>
        )}
      </div>
    </nav>
  );
}