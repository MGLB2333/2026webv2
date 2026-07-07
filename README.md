# LightBoxTV Website

Marketing site for LightBoxTV — "The operating system for modern TV advertising" — built with
**Next.js (App Router) + TypeScript** and a **file-based MDX blog** (no CMS).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static export of every page + posts)
npm start        # serve the production build
```

Set the canonical site URL for SEO/sitemap/RSS (defaults to `https://www.lightboxtv.com`):

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.lightboxtv.com
```

## ✍️ Adding a blog post

**Create one file: `content/posts/<slug>.mdx`.** That's it — no code changes, no registration.
The filename is the URL slug (`/blog/<slug>`).

```mdx
---
title: "Your post title"
description: "One–two sentences. Used for the card, the article intro and SEO."
category: "Industry"        # also becomes a filter chip on /blog
date: "2026-06-20"          # ISO date; controls ordering (newest first)
cover: "v2"                 # optional gradient: "" | v2 | v3 | v4 | v5 | v6
featured: true              # optional; promotes it to the large slot on /blog
author: "Jane Doe"          # optional; defaults to "LightBoxTV Team"
---

Write the article in Markdown. Use a pull-quote with the built-in component:

<Pull>A sentence worth pulling out of the body.</Pull>

## A heading

- bullet
- points

…and so on.
```

Adding that file automatically gives you:

- the article page at `/blog/<slug>` (statically generated) with its own SEO metadata + Open Graph
- a card on the **/blog** index (with working category filter) and in each article's "Keep reading"
- an entry on the **homepage** "From the blog" (shows the 3 newest)
- inclusion in **`/sitemap.xml`** and the **`/feed.xml`** RSS feed

Reading time is computed automatically from the content.

## How it works

| Concern | Where |
|---|---|
| Read/parse MDX files + frontmatter | `lib/posts.ts` (`fs` + `gray-matter`) |
| Render MDX → React | `next-mdx-remote/rsc` + `remark-gfm`, in `app/blog/[slug]/page.tsx` |
| Custom MDX components (`<Pull>`, links) | `components/mdx-components.tsx` |
| Site-wide constants (name, URL, email) | `lib/site.ts` |
| SEO | per-page `metadata` / `generateMetadata`, `app/sitemap.ts`, `app/robots.ts`, `app/feed.xml/route.ts` |

## Structure

```
app/
  layout.tsx            # root layout, global CSS + base metadata
  page.tsx              # home (latest posts pulled from MDX)
  blog/page.tsx         # blog index (featured + filterable grid)
  blog/[slug]/page.tsx  # article (renders MDX, SEO, generateStaticParams)
  contact|privacy|terms|cannes/page.tsx
  sitemap.ts · robots.ts · feed.xml/route.ts
components/             # SiteNav, SiteFooter, ScrollReveal, *Form, BlogPosts, PostCard, mdx-components
content/posts/*.mdx     # ← blog content lives here
lib/                    # posts.ts, site.ts
styles/                 # hand-written CSS (global base + per-page), reused from the original design
public/                 # fonts (woff2), images
```

### Styling
The original hand-written CSS is preserved as global/route-scoped stylesheets in `styles/`:
`base.css` (shared: tokens, reset, nav incl. mobile drawer, footer) is imported in the root
layout; each page imports only the stylesheets it needs, so per-page `body` backgrounds don't
collide. `fonts.css` self-hosts Archivo + Hanken Grotesk from `public/fonts`.

### Notes
- Contact and Cannes forms are **front-end only** (validate + success); wire the `handleSubmit`
  in `components/ContactForm.tsx` / `CannesForm.tsx` to a real endpoint to send.
- Privacy/Terms carry **placeholder legal copy** — replace before publishing.
- Article cover/thumbnail art uses brand CSS gradients (no photos in the design).
