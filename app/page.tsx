import { getAllPosts } from './lib/posts';
import { PostCard } from './components/PostCard';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Latest Posts
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Here's some things I decided to do
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-1">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
