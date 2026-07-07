import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/article.css";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description:
    "The terms that govern your use of the LightBoxTV website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SiteNav light />

      <header className="art-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">← Back to home</Link></div>
          <div className="art-head">
            <span className="cat">Legal</span>
            <h1>Website Terms of Use</h1>
            <p className="sub">The terms that govern your use of the LightBoxTV website.</p>
          </div>
          <div className="art-meta"><div className="who">Last updated: 18 June 2026</div></div>
        </div>
      </header>

      <article className="wrap">
        <div className="prose">
          <p>These Website Terms of Use govern your use of <a href="https://www.lightboxtv.com" target="_blank" rel="noopener">https://www.lightboxtv.com</a>.</p>
          <p>By accessing or using this website, you agree to these terms.</p>

          <h2>About Us</h2>
          <p>This website is operated by LightBoxTV Ltd.</p>
          <ul>
            <li><strong>Company number:</strong> 13123369</li>
          </ul>
          <p>
            <strong>Registered office:</strong>
            <br />New House
            <br />67-68 Hatton Garden, Suite 10
            <br />London
            <br />England
            <br />EC1N 8JY
          </p>

          <h2>Use of This Website</h2>
          <p>You may use this website for lawful purposes only.</p>
          <p>You must not:</p>
          <ul>
            <li>Use the website in any way that breaches applicable laws or regulations.</li>
            <li>Attempt to gain unauthorised access to the website or its systems.</li>
            <li>Introduce malicious software, viruses or harmful code.</li>
            <li>Interfere with the operation or security of the website.</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>Unless otherwise stated, all content on this website, including text, graphics, branding, logos, images and software, is owned by or licensed to LightBoxTV Ltd.</p>
          <p>You may view and download content for your own internal business use, but you may not reproduce, distribute, modify or commercially exploit any content without our prior written permission.</p>

          <h2>Website Content</h2>
          <p>The information provided on this website is for general information purposes only.</p>
          <p>While we make reasonable efforts to keep information accurate and up to date, we make no guarantees, representations or warranties regarding the completeness, accuracy or suitability of any content.</p>

          <h2>Third-Party Links</h2>
          <p>This website may contain links to third-party websites.</p>
          <p>LightBoxTV Ltd is not responsible for the content, availability or privacy practices of any third-party websites.</p>

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, LightBoxTV Ltd shall not be liable for any loss or damage arising from the use of, or inability to use, this website.</p>
          <p>Nothing in these terms excludes or limits liability that cannot be excluded by law.</p>

          <h2>Changes to These Terms</h2>
          <p>We may update these terms from time to time.</p>
          <p>Any changes will be published on this page and take effect immediately upon publication.</p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>
          <p>Any dispute arising in connection with these terms or the use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2>Contact</h2>
          <p>If you have any questions about these terms, please contact:</p>
          <p>LightBoxTV Ltd</p>
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
