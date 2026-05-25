'use client';

import { Sandpack, SandpackTheme, SandpackFiles } from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Colours match Shiki github-light / github-dark as closely as CodeMirror allows.
// Sandpack token limitations:
//   - `definition` covers both function calls AND HTML tag names (same CodeMirror token)
//   - `plain` covers both default text AND variable references (can't be separated)
const light = {
  bg:         '#ffffff',
  bgTab:      '#f6f8fa',
  bgActive:   '#e1e4e8',
  text:       '#24292e',  // plain — default text & variable refs
  muted:      '#6a737d',
  comment:    '#6a737d',
  keyword:    '#d73a49',  // const, let, return, =>
  fnAndTag:   '#6f42c1',  // function calls & HTML tags (shared token → purple, not green)
  property:   '#005cc5',  // property access .foo
  number:     '#005cc5',  // numbers, booleans
  string:     '#032f62',
  accent:     '#0366d6',
  error:      '#d73a49',
};

const dark = {
  bg:         '#24292e',
  bgTab:      '#1f2428',
  bgActive:   '#2f363d',
  text:       '#e1e4e8',  // plain — default text & variable refs
  muted:      '#959da5',
  comment:    '#6a737d',
  keyword:    '#f97583',  // const, let, return, =>
  fnAndTag:   '#b392f0',  // function calls & HTML tags (shared token → purple, not green)
  property:   '#79b8ff',  // property access .foo
  number:     '#79b8ff',  // numbers, booleans
  string:     '#9ecbff',
  accent:     '#58a6ff',
  error:      '#f97583',
};

const font = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  size: '15px',
  lineHeight: '1.6',
};

const githubLight: SandpackTheme = {
  colors: {
    surface1: light.bg,
    surface2: light.bgTab,
    surface3: light.bgActive,
    disabled: '#c5c5c5',
    base:     light.text,
    clickable: light.muted,
    hover:    light.text,
    accent:   light.accent,
    error:    light.error,
    errorSurface: '#ffeef0',
  },
  syntax: {
    plain:      light.text,
    comment:    { color: light.comment, fontStyle: 'italic' },
    keyword:    light.keyword,
    tag:        light.fnAndTag,  // standard HTML tags (e.g. <h1>)
    definition: light.fnAndTag,  // function calls & non-standard tags
    property:   light.property,
    static:     light.number,
    string:     light.string,
    punctuation: light.text,
  },
  font,
};

const githubDark: SandpackTheme = {
  colors: {
    surface1: dark.bg,
    surface2: dark.bgTab,
    surface3: dark.bgActive,
    disabled: '#4d4d4d',
    base:     dark.text,
    clickable: dark.muted,
    hover:    dark.text,
    accent:   dark.accent,
    error:    dark.error,
    errorSurface: '#2d1b1b',
  },
  syntax: {
    plain:      dark.text,
    comment:    { color: dark.comment, fontStyle: 'italic' },
    keyword:    dark.keyword,
    tag:        dark.fnAndTag,  // standard HTML tags (e.g. <h1>)
    definition: dark.fnAndTag,  // function calls & non-standard tags
    property:   dark.property,
    static:     dark.number,
    string:     dark.string,
    punctuation: dark.text,
  },
  font,
};

interface SandpackDemoProps {
  files: SandpackFiles;
  template?: 'react-ts' | 'react' | 'vanilla-ts' | 'vanilla';
  editorHeight?: number;
  editorWidthPercentage?: number;
  showNavigator?: boolean;
  showTabs?: boolean;
  showLineNumbers?: boolean;
}

export default function SandpackDemo({
  files,
  template = 'react-ts',
  editorHeight = 600,
  editorWidthPercentage = 60,
  showNavigator = false,
  showTabs = true,
  showLineNumbers = false,
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
    <div className="w-[min(100vw-3rem,60rem)] max-w-none mx-auto relative left-1/2 -translate-x-1/2 sm:w-[min(100vw-4rem,60rem)] lg:w-[min(100vw-5rem,80rem)] rounded-lg overflow-hidden border border-black/20 dark:border-white/20">
      <Sandpack
        template={template}
        files={files}
        options={{
          showNavigator,
          showTabs,
          showLineNumbers,
          editorHeight,
          editorWidthPercentage,
        }}
        theme={resolvedTheme === 'dark' ? githubDark : githubLight}
      />
    </div>
  );
}
