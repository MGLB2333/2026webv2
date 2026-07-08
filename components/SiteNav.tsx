"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

interface SiteNavProps {
  /** Highlight the Blog/News link. */
  activeBlog?: boolean;
  /** Highlight the About link. */
  activeAbout?: boolean;
  /** Highlight the Events link. */
  activeEvents?: boolean;
  /** White nav (colour logo, dark text) for light-background pages — news,
      contact, articles. Default is the dark translucent nav for dark-hero pages. */
  light?: boolean;
  /** Accepted for back-compat with older callers; the nav theme is now chosen
      explicitly via `light`, so these no longer change the appearance. */
  solid?: boolean;
  heroOverlay?: boolean;
}

export default function SiteNav({
  activeBlog = false,
  activeAbout = false,
  activeEvents = false,
  light = false,
}: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let prevY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide when scrolling down (past the hero-ish threshold); reveal on scroll up.
      const delta = y - prevY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        prevY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);
  const navClass = [
    "",
    scrolled ? "scrolled" : "",
    light ? "light" : "",
    hidden && !menuOpen ? "nav-hidden" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav id="nav" className={navClass}>
        <div className="nav-in">
          <Link href="/" aria-label="LightBoxTV home">
            <img className="nav-logo c" src="/images/logo-color.png" alt="LightBoxTV" />
            <img className="nav-logo w" src="/images/logo-white.png" alt="LightBoxTV" />
          </Link>
          <div className="nav-links">
            <Link href="/#platform">Platform</Link>
            <Link href="/#why">Why LightBoxTV</Link>
            {/* About hidden until the /team page is ready — page still reachable directly */}
            {/* <Link href="/team" className={activeAbout ? "active" : undefined}>About</Link> */}
            <Link href="/blog" className={activeBlog ? "active" : undefined}>News</Link>
            <Link href="/events" className={activeEvents ? "active" : undefined}>Events</Link>
          </div>
          <div className="nav-cta">
            <a href={siteConfig.appUrl} className="nav-login">Login</a>
            <Link href="/contact?reason=demo" className="btn dark">Book a demo</Link>
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="mobile-menu">
          <div className="mm-links">
            <Link href="/#platform" onClick={close}>Platform</Link>
            <Link href="/#why" onClick={close}>Why LightBoxTV</Link>
            {/* <Link href="/team" onClick={close}>About</Link> */}
            <Link href="/blog" onClick={close}>News</Link>
            <Link href="/events" onClick={close}>Events</Link>
            <a href={siteConfig.appUrl} onClick={close}>Login</a>
          </div>
          <div className="mm-footer">
            <Link href="/contact?reason=demo" className="btn dark" onClick={close}>Book a demo</Link>
          </div>
        </div>
      </nav>
      <div className="scrim" onClick={close}></div>
    </>
  );
}
