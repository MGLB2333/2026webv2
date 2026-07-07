import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import "@/styles/form.css";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with LightBoxTV. Book a demo, talk to sales, or reach our team about press and partnerships.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteNav light />
      <ScrollReveal />

      <header className="contact-hero">
        <div className="wrap contact-grid">
          <div className="contact-intro reveal">
            <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>Get in touch</span>
            <h1>Let&apos;s talk.</h1>
            <p>Book a demo, ask a question, or reach our team about press and partnerships. We usually reply within one working day.</p>
            <div className="contact-points">
              <div className="cpoint">
                <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg></div>
                <div><h4>Email us</h4><p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></div>
              </div>
              <div className="cpoint">
                <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5l9 7 9-7"></path><path d="M4 4h16a1 1 0 0 1 1 1v0M12 12v8"></path><circle cx="12" cy="20" r="0.5"></circle></svg></div>
                <div><h4>Press &amp; media</h4><p>For press releases and media enquiries, mention &quot;Press&quot; in your message.</p></div>
              </div>
              <div className="cpoint">
                <div className="ci"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
                <div><h4>Book a demo</h4><p>Choose &quot;Book a demo&quot; below and we&apos;ll set up a walkthrough with your team.</p></div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </header>

      <SiteFooter />
    </>
  );
}
