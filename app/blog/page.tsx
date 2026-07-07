import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import BlogPosts from "@/components/BlogPosts";
import { getAllPostMeta, getCategories } from "@/lib/posts";
import "@/styles/blog.css";

export const metadata: Metadata = {
  title: "Latest news",
  description:
    "Press releases, product news and perspectives on planning, automation and measurement for modern TV advertising.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  const categories = getCategories(posts);

  return (
    <>
      <SiteNav activeBlog light />
      <ScrollReveal />

      <div className="blog-page">
        <BlogPosts posts={posts} categories={categories} />

        <section className="endcta">
          <div className="wrap">
            <div className="box reveal">
              <h2>See LightBoxTV in action.</h2>
              <p>
                See how leading agencies are replacing fragmented workflows with one platform for
                planning, managing and measuring modern TV advertising.
              </p>
              <Link href="/contact?reason=demo" className="btn ink">
                Book a demo <span className="ar">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
