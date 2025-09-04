import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const file = await readFile(`./public/posts/${slug}/index.mdx`, 'utf8');
  const { content: source, data: metadata } = matter(file);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{metadata.title}</h1>
      <MDXRemote
        source={source}
        options={{ mdxOptions: { baseUrl: import.meta.url } }}
      />
    </main>
  );
};

export async function generateStaticParams() {
  const dirs = await readdir('./public/posts/', { withFileTypes: true });
  return dirs.filter((d) => d.isDirectory()).map((d) => ({ slug: d.name }));
}

export default PostPage;
