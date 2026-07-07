"use client";

import Link from "next/link";
import { useState } from "react";
import type { PostMeta } from "@/lib/posts";

/** Brand gradient covers, assigned per post by its position in the full list so
    a post keeps its colour as the category filter changes. */
const GRADS = [
  "linear-gradient(150deg,#7C3AED,#4C1D95)",
  "linear-gradient(150deg,#16151B,#7C3AED)",
  "linear-gradient(150deg,#F4502A,#7C3AED)",
  "linear-gradient(150deg,#C2F042,#3A7A0E)",
  "linear-gradient(150deg,#241A4A,#16151B)",
  "linear-gradient(150deg,#7C3AED,#F4502A)",
  "linear-gradient(150deg,#3A4049,#9AA3AE)",
];

/** Newsroom index: category filter, a sticky preview and an interactive list.
    Hovering a row updates the preview; clicking opens the article. */
export default function BlogPosts({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [cat, setCat] = useState("all");
  const [hover, setHover] = useState(0);

  const gradOf = (slug: string) =>
    GRADS[Math.max(0, posts.findIndex((p) => p.slug === slug)) % GRADS.length];

  const list = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  const hi = Math.min(hover, Math.max(0, list.length - 1));
  const preview = list[hi] ?? posts[0];

  const pick = (c: string) => {
    setCat(c);
    setHover(0);
  };

  return (
    <>
      <header className="blog-hero">
        <div className="wrap">
          <span className="eyebrow">Newsroom</span>
          <h1>
            Latest <span className="hl o">news.</span>
          </h1>
          <p>
            Press releases, product news and perspectives on planning, automation and measurement
            for modern TV advertising.
          </p>
          <div className="filters">
            <button className={`chip ${cat === "all" ? "on" : ""}`.trim()} onClick={() => pick("all")}>
              All
            </button>
            {categories.map((c) => (
              <button key={c} className={`chip ${cat === c ? "on" : ""}`.trim()} onClick={() => pick(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="wrap">
        <div className="blog-index">
          {/* sticky preview */}
          <div className="bpreview">
            <Link href={`/blog/${preview.slug}`} className="cover" style={{ background: gradOf(preview.slug) }}>
              {preview.image ? <img className="cover-img" src={preview.image} alt="" /> : null}
              <span className="cat">{preview.category}</span>
            </Link>
            <h2 className="ptitle">{preview.title}</h2>
            <p className="excerpt">{preview.description}</p>
            <Link href={`/blog/${preview.slug}`} className="more">
              Read the article →
            </Link>
          </div>

          {/* interactive index */}
          <div>
            <div className="idx-head">
              <span className="lbl">The index</span>
              <span className="ct">{list.length} articles</span>
            </div>
            {list.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="brow"
                onMouseEnter={() => setHover(i)}
              >
                <div className="bl">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bt">{post.title}</span>
                </div>
                <div className="br">
                  <span className="meta">
                    {post.category} · {post.readingTime}
                  </span>
                  <span className="arc">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
