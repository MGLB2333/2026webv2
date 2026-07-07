import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/** Frontmatter authored at the top of each content/posts/*.mdx file. */
export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  /** ISO date, e.g. "2026-06-10". Used for sorting and display. */
  date: string;
  /** Gradient variant for the cover/thumbnail: "" | "v2" | "v3" | "v4" | "v5" | "v6". */
  cover?: string;
  /** Optional cover image (e.g. "/images/foo.png"). Overlays the gradient on the
      article hero, blog cards and homepage teaser. */
  image?: string;
  /** Marks the post shown in the large "featured" slot on the blog index. */
  featured?: boolean;
  author?: string;
}

/** Frontmatter + derived fields, without the MDX body. */
export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
  formattedDate: string;
}

/** Full post including the raw MDX body. */
export interface Post extends PostMeta {
  content: string;
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    ...fm,
    slug,
    content,
    readingTime: readingTime(content),
    formattedDate: formatDate(fm.date),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All posts as metadata only (no MDX body) — safe to pass to client components. */
export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getFeaturedPost(posts: PostMeta[]): PostMeta | undefined {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getCategories(posts: PostMeta[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

/** Related posts for an article footer: same category first, then most recent. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPostMeta();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
