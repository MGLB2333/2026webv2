import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

/** Standard post card (.pcard) used in the blog grid and "Keep reading" rows. */
export default function PostCard({ post }: { post: PostMeta }) {
  const phClass = ["ph", post.cover].filter(Boolean).join(" ");
  return (
    <Link href={`/blog/${post.slug}`} className="pcard reveal">
      <div className={phClass}>
        {post.image && <img src={post.image} alt="" />}
        <span className="cat">{post.category}</span>
      </div>
      <div className="pb">
        <div className="meta">{post.readingTime}</div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="more">Read more →</span>
      </div>
    </Link>
  );
}
