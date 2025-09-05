import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  spoiler?: string;
}

export async function getPostNavigation(currentSlug: string) {
  const dirs = await readdir('./public/posts/', { withFileTypes: true });
  const postSlugs = dirs.filter((d) => d.isDirectory()).map((d) => d.name);
  
  // Get all post metadata
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const file = await readFile(`./public/posts/${slug}/index.mdx`, 'utf8');
      const { data } = matter(file);
      return {
        slug,
        title: data.title,
        date: data.date,
        spoiler: data.spoiler,
      } as PostMeta;
    })
  );
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Find current post index
  const currentIndex = sortedPosts.findIndex((post) => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  
  return { previousPost, nextPost };
}