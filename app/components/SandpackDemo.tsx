'use client';

import {
  Sandpack,
  SandpackThemeProp,
  SandpackFiles,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface SandpackDemoProps {
  files: SandpackFiles;
  template?: 'react-ts' | 'react' | 'vanilla-ts' | 'vanilla';
  editorHeight?: number;
  showNavigator?: boolean;
  showTabs?: boolean;
  showLineNumbers?: boolean;
}

export default function SandpackDemo({
  files,
  template = 'react-ts',
  editorHeight = 400,
  showNavigator = false,
  showTabs = true,
  showLineNumbers = true,
}: SandpackDemoProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-[min(100vw-3rem,60rem)] max-w-none mx-auto relative left-1/2 -translate-x-1/2 sm:w-[min(100vw-4rem,60rem)] lg:w-[min(100vw-5rem,60rem)]">
      <Sandpack
        template={template}
        files={files}
        options={{
          showNavigator,
          showTabs,
          showLineNumbers,
          editorHeight,
        }}
        theme={resolvedTheme as SandpackThemeProp}
      />
    </div>
  );
}
