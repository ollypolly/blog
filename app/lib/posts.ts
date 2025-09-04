import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { showTestPosts } from './environment';

export interface Post {
  slug: string;
  title: string;
  date: string;
  spoiler: string;
  test?: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  const dirs = await readdir('./public/posts/', { withFileTypes: true });
  const postDirs = dirs.filter((d) => d.isDirectory());

  const posts = await Promise.all(
    postDirs.map(async (dir) => {
      const file = await readFile(`./public/posts/${dir.name}/index.mdx`, 'utf8');
      const { data: metadata } = matter(file);
      
      return {
        slug: dir.name,
        title: metadata.title,
        date: metadata.date,
        spoiler: metadata.spoiler,
        test: metadata.test || false,
      };
    })
  );

  // Filter out test posts based on environment
  const filteredPosts = posts.filter(post => {
    // If it's a test post and we shouldn't show test posts, exclude it
    if (post.test && !showTestPosts) {
      return false;
    }
    return true;
  });

  return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}