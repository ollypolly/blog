import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import rehypeShiki from '@shikijs/rehype';
import rehypeFigure from 'rehype-figure';
import { globalComponents } from '@/app/components/global-components';
import { createImageComponent } from '@/app/lib/mdx-image-handler';
import { loadPostComponents } from '@/app/lib/load-post-components';
import { getPostNavigation } from '@/app/lib/post-navigation';
import PostNavigation from '@/app/components/PostNavigation';
import Comments from '@/app/components/Comments';
import { remarkTreeTransform } from '@/app/lib/remark-tree-transform';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const file = await readFile(`./public/posts/${slug}/index.mdx`, 'utf8');
  const { content: source, data: metadata } = matter(file);

  const postComponents = await loadPostComponents(slug);

  const { previousPost, nextPost } = await getPostNavigation(slug);

  const formattedDate = new Date(metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert w-full max-w-none">
      <div className="mb-8">
        <h1 className="mb-2">{metadata.title}</h1>
        {metadata.spoiler && (
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2 font-medium leading-relaxed">
            {metadata.spoiler}
          </p>
        )}
        <time className="text-gray-500 text-sm" dateTime={metadata.date}>
          {formattedDate}
        </time>
        <hr className="mt-6 border-gray-200 dark:border-gray-700" />
      </div>

      <MDXRemote
        source={source}
        components={{
          ...globalComponents,
          ...postComponents,
          img: createImageComponent(slug),
        }}
        options={{
          mdxOptions: {
            baseUrl: import.meta.url,
            remarkPlugins: [
              remarkTreeTransform
            ],
            rehypePlugins: [
              [rehypeFigure, { className: 'image-figure' }],
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

      <PostNavigation previousPost={previousPost} nextPost={nextPost} />
      <Comments slug={slug} />
    </article>
  );
};

export async function generateStaticParams() {
  const dirs = await readdir('./public/posts/', { withFileTypes: true });
  return dirs.filter((d) => d.isDirectory()).map((d) => ({ slug: d.name }));
}

export default PostPage;
