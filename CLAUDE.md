# Claude Code Assistant Notes

This file contains important context and guidelines for working on this Next.js blog project.

## Project Overview

This is a personal blog built with Next.js 15, TypeScript, Tailwind CSS v4, and MDX. It serves as an accountability tool for documenting the Club Penguin rebuild project.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 (requires `@custom-variant dark (&:where(.dark, .dark *));` in globals.css)
- **Content**: MDX with `@tailwindcss/typography` and `next-mdx-remote-client`
- **Interactive Demos**: Sandpack (`@codesandbox/sandpack-react`) for live code examples
- **Comments**: Giscus (`@giscus/react`) powered by GitHub Discussions
- **Theme**: next-themes for dark mode (replaces custom Zustand implementation)
- **Package Manager**: pnpm (not npm!)
- **Deployment**: Netlify

## Key Implementation Details

### Dark Mode

- Uses `next-themes` with `attribute="class"` and `defaultTheme="system"`
- ThemeToggle component uses mounted state pattern to prevent hydration mismatch
- **IMPORTANT**: Avoid `transition-colors` class - it causes flash during theme changes
- Tailwind v4 requires custom variant in globals.css: `@custom-variant dark (&:where(.dark, .dark *));`

### Environment Detection

- Development shows test posts (`SHOW_TEST_POSTS=true` in .env.development)
- Production hides test posts (`SHOW_TEST_POSTS=false` in .env.production)
- All test posts have `test: true` in frontmatter
- Filtering handled in `app/lib/posts.ts`

### Responsive Typography

- Uses mobile-first approach with Tailwind responsive classes
- Pattern: `text-{mobile} sm:text-{tablet} lg:text-{desktop}`
- Prose content uses responsive classes: `prose prose-sm sm:prose-base lg:prose-lg`

### Components Structure

```
app/
├── components/
│   ├── Header.tsx (server component)
│   ├── ThemeToggle.tsx (client component with mounted check)
│   ├── Footer.tsx (with @ollypolly attribution)
│   ├── Container.tsx (consistent spacing wrapper)
│   ├── PostCard.tsx (hover scale animation)
│   ├── SandpackDemo.tsx (interactive code demos with theme support)
│   ├── Comments.tsx (Giscus comments with theme integration)
│   └── PostNavigation.tsx (previous/next post navigation)
├── lib/
│   ├── posts.ts (MDX post utilities with environment filtering)
│   └── environment.ts (environment detection utilities)
└── providers/ (removed - using next-themes directly)
```

### Styling Approach

- Light theme uses soft colors: `bg-gray-50`, `text-gray-800` (not harsh white/black)
- Dark theme uses standard grays: `bg-gray-900`, `text-gray-100`
- Borders are subtle: `border-gray-100` in light mode
- Consistent hover states and transitions (but avoid `transition-colors`)

## Development Commands

```bash
pnpm dev          # Development server (shows test posts)
pnpm build        # Production build (hides test posts)
pnpm start        # Production preview
```

## Content Management

### Posts Location

- Posts stored in `/public/posts/{slug}/index.mdx`
- Frontmatter: `title`, `date`, `spoiler`, `test` (boolean)

### Test Posts

- All current posts except original are marked `test: true`
- Automatically filtered based on `SHOW_TEST_POSTS` environment variable
- Safe for production deployment

## Deployment Notes

### Netlify Environment Variables

Set these in Netlify dashboard:

- `SHOW_TEST_POSTS=false`
- `NEXT_PUBLIC_ENV_MODE=production`

### Build Configuration

- Uses Turbopack for faster builds (`--turbopack` flag)
- Static generation for all pages
- MDX compiled at build time

## Known Issues & Solutions

1. **Hydration mismatch with theme**: Use mounted state pattern in client components
2. **Flash on theme change**: Avoid `transition-colors`, use individual property transitions
3. **Tailwind v4 dark mode**: Requires custom variant directive in globals.css
4. **Layout shift prevention**: Use placeholder elements with same dimensions

## Interactive Code Demos

### Sandpack Integration

- Use `@codesandbox/sandpack-react` for live, editable code examples
- Perfect for showing Club Penguin rebuild progress with interactive demos
- Users can edit code and see changes in real-time
- Multi-file support for complex examples (components + styles + logic)

### Usage Pattern

```jsx
import { Sandpack } from '@codesandbox/sandpack-react';

<Sandpack
  template="react-ts"
  files={{
    'App.tsx': componentCode,
    'styles.css': styles,
  }}
  options={{
    showNavigator: false,
    showTabs: true,
    editorHeight: 400,
  }}
  theme="light"
/>;
```

## Future Enhancements

- Real-time project progress tracking components
- Penguin avatar components for MDX demos
- WebSocket integration examples

## Important Conventions

- Use pnpm, not npm
- **Always use TypeScript**: Prefer .ts/.tsx files over .js/.jsx, including configs (next.config.ts, not .js)
- Follow existing responsive patterns
- Maintain environment-based content filtering
- Keep components minimal and focused
- Server components by default, client only when needed
