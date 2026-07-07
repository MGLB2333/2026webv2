import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="fl">
            <img src="/images/logo-white.png" alt="LightBoxTV" />
            <p>
              The operating system for modern TV advertising. Plan, manage and measure every
              campaign in one place.
            </p>
          </div>
          <div className="foot-cols">
            <div>
              <h6>Explore</h6>
              <Link href="/#platform">Platform</Link>
              <Link href="/#why">Why LightBoxTV</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/events">Events</Link>
            </div>
            <div>
              <h6>Company</h6>
              {/* About hidden until the /team page is ready — page still reachable directly */}
              {/* <Link href="/team">About</Link> */}
              <Link href="/contact?reason=demo">Book a demo</Link>
              <Link href="/contact">Contact us</Link>
              <a href={siteConfig.appUrl}>Login</a>
            </div>
            <div>
              <h6>Get in touch</h6>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <Link href="/">lightboxtv.com</Link>
              <a
                href="https://www.linkedin.com/company/lightboxtv/"
                target="_blank"
                rel="noopener"
                className="foot-social"
                aria-label="LightBoxTV on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 LightBoxTV. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy</Link> · <Link href="/cookies">Cookies</Link> · <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
