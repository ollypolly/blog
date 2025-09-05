import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import rehypeShiki from '@shikijs/rehype';
import { mdxComponents } from '@/app/components/mdx-components';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const file = await readFile(`./public/posts/${slug}/index.mdx`, 'utf8');
  const { content: source, data: metadata } = matter(file);

  const formattedDate = new Date(metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert">
      <h1>{metadata.title}</h1>
      <time className="text-gray-500 text-sm" dateTime={metadata.date}>
        {formattedDate}
      </time>

      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            baseUrl: import.meta.url,
            rehypePlugins: [
              [
                rehypeShiki,
                {
                  themes: {
                    light: 'github-light',
                    dark: 'github-dark',
                  },
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
};

export async function generateStaticParams() {
  const dirs = await readdir('./public/posts/', { withFileTypes: true });
  return dirs.filter((d) => d.isDirectory()).map((d) => ({ slug: d.name }));
}

export default PostPage;
