import type { Metadata } from "next";
import "@/styles/base.css";
import { archivo, hanken } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import NewsBar from "@/components/NewsBar";
import { getAllPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const latest = getAllPostMeta()[0];
  return (
    <html lang="en" className={`${archivo.variable} ${hanken.variable}`}>
      <body>
        {latest && <NewsBar title={latest.title} href={`/blog/${latest.slug}`} />}
        {children}
      </body>
    </html>
  );
}
