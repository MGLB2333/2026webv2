import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import PostCard from "@/components/PostCard";
import { mdxComponents } from "@/components/mdx-components";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import "@/styles/article.css";
import "@/styles/blog.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = getPost(slug);
  } catch {
    return {};
  }
  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [post.author ?? `${siteConfig.name} Team`],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const related = getRelatedPosts(slug);
  const coverClass = ["art-cover", post.cover].filter(Boolean).join(" ");
  const subject = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(`${siteConfig.url}/blog/${slug}`);

  return (
    <>
      <SiteNav activeBlog light />
      <ScrollReveal />

      <header className="art-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/blog">← Back to blog</Link></div>
          <div className="art-head">
            <span className="cat">{post.category} · {post.readingTime}</span>
            <h1>{post.title}</h1>
            <p className="sub">{post.description}</p>
          </div>
          <div className="art-meta">
            <div className="av"></div>
            <div className="who">{post.author ?? `${siteConfig.name} Team`}<span>Published {post.formattedDate}</span></div>
          </div>
          <div className={coverClass}>
            {post.image && <img src={post.image} alt={post.title} />}
          </div>
        </div>
      </header>

      <article className="wrap">
        <div className="prose">{content}</div>

        <div className="art-foot">
          <Link href="/blog" className="btn line">← All articles</Link>
          <div className="share">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4z" /></svg></a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${subject}`} target="_blank" rel="noopener" aria-label="Share on X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5-6.6L5.5 22H2.4l8-9.2L1.5 2h6.9l4.5 6 5.9-6zm-2.4 18h1.7L7.6 3.8H5.8z" /></svg></a>
            <a href={`mailto:?subject=${subject}&body=${shareUrl}`} aria-label="Share by email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="more-wrap">
          <div className="wrap">
            <h3>Keep reading</h3>
            <div className="more-grid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
