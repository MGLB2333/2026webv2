import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/posts";
import { getEventDetailSlugs } from "@/lib/events";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // "/team" omitted while the About page is unfinished — still reachable by direct URL, just not advertised for indexing.
  const staticRoutes = ["", "/blog", "/contact", "/privacy", "/cookies", "/terms", "/cannes", "/events", "/ctv-supply-path-explorer", "/tagtester", "/complexity-assessment"].map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: new Date(),
  }));

  const posts = getAllPostMeta().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const eventPages = getEventDetailSlugs().map((slug) => ({
    url: `${siteConfig.url}/events/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...posts, ...eventPages];
}
