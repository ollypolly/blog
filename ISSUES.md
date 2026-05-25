# Known Issues

## Todo

- [ ] `/now` page — what I'm focused on right now (projects, learning, location). See nownownow.com
- [ ] `/uses` page — dev setup: editor, theme, font, terminal, hardware. See uses.tech
- [ ] Merge portfolio into this site
- [ ] Refactor `globals.css` — it's becoming a god-file; scope styles closer to components, split by concern

## Hydration mismatch on post pages

**Status:** Open  
**File:** `app/[slug]/page.tsx`

React reports a hydration mismatch on every post page. The server renders the outer `<div role="article" className="prose...">` wrapper correctly, but the client tree starts at the inner `<div className="mb-8">`, as if the outer wrapper doesn't exist.

```
<div
+  role="article"
-  role={null}
+  className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
-  className="mb-8"
>
+  <div className="mb-8">
-  <h1 className="mb-2">
```

The error was originally on an `<article>` element (same structure, same mismatch). Changing to `<div role="article">` didn't fix it — the client still skips the outer wrapper.

**What's been ruled out:**
- Date timezone mismatch — fixed with `T12:00:00` suffix
- Browser extension stripping the element — no evidence of this
- Giscus / Comments component — commenting it out did not resolve the error

**Likely suspects:**
- Something in how Next.js / Turbopack serialises async RSC output
- MDX rendering producing invalid HTML that causes the browser to reparse the DOM before hydration
- `loadPostComponents` dynamic import interaction with the RSC payload
