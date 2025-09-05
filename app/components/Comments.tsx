'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <Giscus
        id="comments"
        repo="ollypolly/blog"
        repoId="R_kgDOPpthVQ"
        category="Blog Comments"
        categoryId="DIC_kwDOPpthVc4CvBpK"
        mapping="pathname"
        term={slug}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}