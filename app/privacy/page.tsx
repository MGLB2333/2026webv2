import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/article.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LightBoxTV Ltd collects, uses, stores and protects your personal information when you interact with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNav light />

      <header className="art-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">← Back to home</Link></div>
          <div className="art-head">
            <span className="cat">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="sub">How LightBoxTV collects, uses, stores and protects your personal information when you interact with us.</p>
          </div>
          <div className="art-meta"><div className="who">Last updated: 18 June 2026</div></div>
        </div>
      </header>

      <article className="wrap">
        <div className="prose">
          <h2>Introduction</h2>
          <p>LightBoxTV Ltd (“LightBoxTV”, “we”, “our”, or “us”) is committed to protecting and respecting your privacy.</p>
          <p>This Privacy Policy explains how we collect, use, store and protect your personal information when you visit LightBoxTV.com, request a demonstration, contact us, attend an event, or otherwise interact with us.</p>
          <p>We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and other applicable privacy laws.</p>

          <h2>Who We Are</h2>
          <p>LightBoxTV Ltd is responsible for the personal information collected through this website.</p>
          <ul>
            <li><strong>Company name:</strong> LightBoxTV Ltd</li>
            <li><strong>Website:</strong> <a href="https://www.lightboxtv.com" target="_blank" rel="noopener">https://www.lightboxtv.com</a></li>
            <li><strong>Email:</strong> <a href="mailto:privacy@lightboxtv.com">privacy@lightboxtv.com</a></li>
            <li><strong>Registered company number:</strong> 13123369</li>
          </ul>
          <p>
            <strong>Registered office:</strong>
            <br />New House
            <br />67-68 Hatton Garden, Suite 10
            <br />London
            <br />England
            <br />EC1N 8JY
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <p>We may collect personal information that you voluntarily provide to us, including:</p>
          <ul>
            <li>Name</li>
            <li>Company name</li>
            <li>Job title</li>
            <li>Business email address</li>
            <li>Telephone number</li>
            <li>Information submitted through contact forms</li>
            <li>Information provided when requesting a demonstration</li>
            <li>Information provided when registering for events or webinars</li>
            <li>Any correspondence you send to us</li>
          </ul>
          <h3>Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Website usage data</li>
            <li>Referring website information</li>
            <li>Pages viewed</li>
            <li>Session duration</li>
            <li>Interaction and engagement data</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use your personal information to:</p>
          <ul>
            <li>Respond to enquiries and requests</li>
            <li>Arrange and deliver product demonstrations</li>
            <li>Provide information about our products and services</li>
            <li>Manage customer and prospect relationships</li>
            <li>Improve our website and user experience</li>
            <li>Communicate with you regarding your enquiry or relationship with LightBoxTV</li>
            <li>Invite you to relevant events, webinars and industry activities</li>
            <li>Monitor website performance and usage</li>
            <li>Protect our systems and services</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2>Legal Bases for Processing</h2>
          <p>We process personal information under one or more of the following legal bases:</p>
          <h3>Legitimate Interests</h3>
          <p>To:</p>
          <ul>
            <li>Operate and improve our business</li>
            <li>Respond to enquiries</li>
            <li>Develop customer relationships</li>
            <li>Promote our products and services to relevant organisations</li>
            <li>Analyse website performance</li>
          </ul>
          <h3>Consent</h3>
          <p>Where required, including for:</p>
          <ul>
            <li>Non-essential cookies and analytics technologies</li>
          </ul>
          <h3>Contract</h3>
          <p>Where processing is necessary to:</p>
          <ul>
            <li>Enter into a contract</li>
            <li>Deliver services</li>
            <li>Manage contractual relationships</li>
          </ul>
          <h3>Legal Obligation</h3>
          <p>Where we are required to process information to comply with applicable laws and regulations.</p>

          <h2>Communications</h2>
          <p>If you contact us, request a demonstration, attend an event, download content or otherwise engage with LightBoxTV, we may communicate with you regarding your enquiry, our products and services, relevant updates, events and industry insights where permitted by law.</p>
          <p>You may opt out of non-essential communications at any time by contacting us using the details provided below.</p>

          <h2>Cookies and Analytics</h2>
          <p>We use cookies and similar technologies to improve our website, understand how visitors use our website and help us enhance the user experience.</p>
          <h3>Google Analytics</h3>
          <p>We use Google Analytics, a web analytics service provided by Google, to help us understand how visitors interact with our website.</p>
          <p>Google Analytics may collect information including:</p>
          <ul>
            <li>IP address (which may be anonymised by Google)</li>
            <li>Device and browser information</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Referral source</li>
            <li>Approximate geographic location</li>
            <li>Website interactions and engagement metrics</li>
          </ul>
          <p>This information is used to:</p>
          <ul>
            <li>Monitor website performance</li>
            <li>Understand visitor behaviour</li>
            <li>Improve website content and usability</li>
            <li>Measure the effectiveness of our website</li>
          </ul>
          <p>Google may process this information on our behalf in accordance with its own privacy policies.</p>
          <p>We will only place non-essential analytics cookies on your device where you have provided your consent through our cookie preferences tool.</p>
          <p>You can withdraw or change your cookie preferences at any time.</p>
          <h3>Managing Cookies</h3>
          <p>Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, although doing so may affect the functionality of parts of our website.</p>
          <p>Further details are available in our <Link href="/cookies">Cookie Policy</Link>.</p>

          <h2>How We Share Information</h2>
          <p>We may share personal information with trusted third-party service providers that help us operate our business and website, including:</p>
          <ul>
            <li>Website hosting providers</li>
            <li>Analytics providers</li>
            <li>Customer relationship management (CRM) platforms</li>
            <li>Communication and email service providers</li>
            <li>Professional advisers, including legal and accounting advisers</li>
            <li>Regulatory authorities where required by law</li>
          </ul>
          <p>We do not sell personal information to third parties.</p>

          <h2>International Transfers</h2>
          <p>Some of our service providers may process personal information outside the United Kingdom.</p>
          <p>Where this occurs, we take appropriate steps to ensure that personal information remains protected, including the use of recognised contractual safeguards and other lawful transfer mechanisms where required.</p>

          <h2>Data Retention</h2>
          <p>We retain personal information only for as long as necessary to fulfil the purposes described in this Privacy Policy, including:</p>
          <ul>
            <li>Managing customer and prospect relationships</li>
            <li>Complying with legal obligations</li>
            <li>Resolving disputes</li>
            <li>Enforcing agreements</li>
          </ul>
          <p>Retention periods are reviewed regularly and information is securely deleted when no longer required.</p>

          <h2>Data Security</h2>
          <p>We implement appropriate technical and organisational measures designed to protect personal information against:</p>
          <ul>
            <li>Unauthorised access</li>
            <li>Accidental loss</li>
            <li>Misuse</li>
            <li>Alteration</li>
            <li>Disclosure</li>
            <li>Destruction</li>
          </ul>
          <p>While we take reasonable steps to protect personal information, no method of transmission over the internet or method of electronic storage can be guaranteed to be completely secure.</p>

          <h2>Your Rights</h2>
          <p>Under applicable data protection laws, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of personal information</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
            <li>Withdraw consent where processing relies upon consent</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details below.</p>
          <p>You also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).</p>
          <p>
            <strong>Information Commissioner’s Office (ICO)</strong>
            <br />Website: <a href="https://www.ico.org.uk" target="_blank" rel="noopener">https://www.ico.org.uk</a>
          </p>

          <h2>Third-Party Websites</h2>
          <p>Our website may contain links to third-party websites, services or resources.</p>
          <p>We are not responsible for the privacy practices or content of those third parties and encourage you to review their privacy policies before providing personal information.</p>

          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>Any changes will be published on this page and the “Last Updated” date at the top of this document will be revised accordingly.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we process personal information, please contact:</p>
          <p>
            LightBoxTV Ltd
            <br />New House
            <br />67-68 Hatton Garden, Suite 10
            <br />London
            <br />England
            <br />EC1N 8JY
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:privacy@lightboxtv.com">privacy@lightboxtv.com</a>
            <br /><strong>Website:</strong> <a href="https://www.lightboxtv.com" target="_blank" rel="noopener">https://www.lightboxtv.com</a>
          </p>
        </div>

        <div className="art-foot">
          <Link href="/" className="btn line">← Back to home</Link>
          <Link href="/terms" className="btn line">Terms of Service →</Link>
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
