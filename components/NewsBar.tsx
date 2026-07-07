"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Dismissible announcement bar — homepage only. Whenever it is NOT showing
    (any other route, or dismissed) it stamps html.no-newsbar, which forces the
    nav/page offset (--newsbar-h) back to 0. Because that class is keyed to the
    live component state rather than to which stylesheet is loaded, the offset
    stays correct across client-side navigation (home.css can linger after a
    soft nav away from the homepage). Choice persists for the session. */
export default function NewsBar({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const show = pathname === "/" && open;

  // Restore a prior dismissal (can't read sessionStorage during SSR).
  useEffect(() => {
    if (sessionStorage.getItem("lb-newsbar") === "closed") setOpen(false);
  }, []);

  // Keep the offset in sync with whether the bar is actually on screen.
  useEffect(() => {
    document.documentElement.classList.toggle("no-newsbar", !show);
  }, [show]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("lb-newsbar", "closed");
    } catch {}
  };

  if (!show) return null;

  return (
    <div className="newsbar" role="region" aria-label="Announcement">
      <span className="nb-pill" aria-hidden>
        <span className="nb-dot" />
      </span>
      <span className="nb-msg">{title}</span>
      <Link href={href} className="nb-more">
        Read more <span aria-hidden>↗</span>
      </Link>
      <button className="nb-x" onClick={dismiss} aria-label="Dismiss announcement">
        ✕
      </button>
    </div>
  );
}
