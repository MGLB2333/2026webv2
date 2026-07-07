import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CannesForm from "@/components/CannesForm";
import CannesHeroBg from "@/components/CannesHeroBg";
import "@/styles/form.css";
import "@/styles/cannes.css";

export const metadata: Metadata = {
  title: "Meet us at Cannes",
  description:
    "Meet the LightBoxTV team at Cannes Lions 2026, 22–25 June. Request a meeting on the Croisette.",
  alternates: { canonical: "/cannes" },
};

export default function CannesPage() {
  return (
    <>
      <SiteNav heroOverlay />

      <div className="cn-page">
        <section className="cn-hero">
          <CannesHeroBg />

          <div className="wrap cn-grid">
            <div className="cn-copy">
              <span className="badge"><span className="live"></span> Cannes Lions 2026</span>
              <h1>Meet us<br />at <span className="ac">Cannes.</span></h1>
              <p className="sub">We&apos;ll be on the Croisette for Cannes Lions. Fill out the form to get in touch and schedule some time to connect with the LightBoxTV team.</p>
              <div className="cn-facts">
                <div className="fact">
                  <span className="i"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg></span>
                  <span><span className="k">When</span><span className="v">22 — 25 June 2026</span></span>
                </div>
                <div className="fact">
                  <span className="i"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="2.5"></circle></svg></span>
                  <span><span className="k">Where</span><span className="v">Cannes, France</span></span>
                </div>
              </div>
            </div>

            <div className="cn-form-wrap">
              <CannesForm />
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
