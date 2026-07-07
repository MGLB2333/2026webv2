import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/article.css";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How LightBoxTV uses cookies and similar technologies, including Google Analytics, and how you can manage them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <SiteNav light />

      <header className="art-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">← Back to home</Link></div>
          <div className="art-head">
            <span className="cat">Legal</span>
            <h1>Cookie Policy</h1>
            <p className="sub">How LightBoxTV uses cookies and similar technologies, and how you can manage them.</p>
          </div>
          <div className="art-meta"><div className="who">Last updated: 18 June 2026</div></div>
        </div>
      </header>

      <article className="wrap">
        <div className="prose">
          <h2>What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences and understand how visitors use a site.</p>

          <h2>How We Use Cookies</h2>
          <p>LightBoxTV uses cookies to:</p>
          <ul>
            <li>Ensure the website functions correctly</li>
            <li>Understand how visitors use our website</li>
            <li>Improve website performance and user experience</li>
          </ul>

          <h2>Google Analytics</h2>
          <p>We use Google Analytics to collect anonymous information about how visitors use our website.</p>
          <p>This may include:</p>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Device and browser information</li>
            <li>Approximate location</li>
            <li>Referral source</li>
          </ul>
          <p>This information helps us improve our website and understand visitor engagement.</p>
          <p>The Google Analytics cookies we use may include:</p>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr><td>_ga</td><td>Distinguishes visitors</td><td>Up to 2 years</td></tr>
              <tr><td>_ga*</td><td>Maintains session state</td><td>Up to 2 years</td></tr>
            </tbody>
          </table>

          <h2>Managing Cookies</h2>
          <p>When you first visit our website, you will be given the option to accept or reject non-essential cookies.</p>
          <p>You can also manage or delete cookies through your browser settings at any time. Please note that disabling certain cookies may affect how parts of the website function.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Cookie Policy from time to time. Any updates will be published on this page.</p>

          <h2>Contact</h2>
          <p>If you have any questions about this Cookie Policy, please contact:</p>
          <p>
            LightBoxTV Ltd
            <br />New House
            <br />67-68 Hatton Garden, Suite 10
            <br />London
            <br />England
            <br />EC1N 8JY
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:hello@lightboxtv.com">hello@lightboxtv.com</a>
            <br /><strong>Website:</strong> <a href="https://www.lightboxtv.com" target="_blank" rel="noopener">https://www.lightboxtv.com</a>
          </p>
        </div>

        <div className="art-foot">
          <Link href="/" className="btn line">← Back to home</Link>
          <Link href="/privacy" className="btn line">Privacy Policy →</Link>
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
