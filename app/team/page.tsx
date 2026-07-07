import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import "@/styles/team.css";

export const metadata: Metadata = {
  title: "About us",
  description:
    "LightBoxTV is a team of TV, data and product people building the operating system for modern TV advertising — one platform to plan, manage and measure it all.",
  alternates: { canonical: "/team" },
};

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const TEAM = [
  {
    initial: "M",
    grad: "linear-gradient(135deg,#C2F042,#7C3AED)",
    name: "Mark Giblin",
    role: "Co-Founder & CEO",
    bio: "Programmatic TV and media technology specialist with leadership experience across Magnite, Unruly, PubMatic, the Financial Times and The Telegraph. Mark has spent his career helping agencies and brands navigate the evolving TV and video advertising landscape.",
  },
  {
    initial: "D",
    grad: "linear-gradient(135deg,#7C3AED,#C2F042)",
    name: "Dean Cussell",
    role: "Co-Founder & COO",
    bio: "Experienced ad-tech entrepreneur with a track record of building and scaling successful technology businesses. Founder of Statiq, which was acquired by Telefónica, with deep expertise in product delivery, operations and commercial growth.",
  },
  {
    initial: "S",
    grad: "linear-gradient(135deg,#7C3AED,#4C1D95)",
    name: "Simon Macson",
    role: "CPTO",
    bio: "One of the industry’s most experienced TV advertising product leaders. Former Head of Product, Europe at Samsung Ads and previously responsible for building and launching Sky AdSmart’s planning and analytics platform.",
  },
];

export default function TeamPage() {
  return (
    <>
      <SiteNav activeAbout />
      <ScrollReveal />

      {/* HERO */}
      <header className="ab-hero">
        <div className="wrap">
          <span className="eyebrow">About LightBoxTV</span>
          <h1>Modern TV got complicated. <span className="ac">We&apos;re putting it back together.</span></h1>
          <div className="row">
            <p>We&apos;re a team of TV, data and product people building the operating system for modern TV advertising — one platform to plan, manage and measure it all.</p>
            <div className="cta-row">
              <Link href="/contact?reason=demo" className="btn lite">Book a demo <span className="ar">↗</span></Link>
              <Link href="/contact" className="btn line" style={{ color: "#fff" }}>Get in touch</Link>
            </div>
          </div>
        </div>
      </header>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap grid">
          <div className="lbl reveal">Why we exist</div>
          <div className="body reveal">
            <p>TV used to be simple to plan. A few channels, one currency, a process that barely changed. That world is gone.</p>
            <p className="muted">Today a single audience is scattered across linear, streaming, on-demand and social — each with its own data, inventory and reporting. Planners are left stitching it together by hand. We think that&apos;s backwards.</p>
            <p>LightBoxTV exists to reconnect the workflow: to take the busywork out of planning and give teams one place to see, decide and act across every screen.</p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stat-strip">
        <div className="wrap">
          <div className="s"><div className="n">10<span className="u">+</span></div><div className="d">Hours saved per planner, every week</div></div>
          <div className="s"><div className="n">1<span className="u">×</span></div><div className="d">Platform for planning, trading and analytics</div></div>
          <div className="s"><div className="n">All<span className="u"> video</span></div><div className="d">Linear and connected TV, in one view</div></div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="wrap">
          <div className="head reveal">
            <span className="eyebrow">What we believe</span>
            <h2>The principles behind the product.</h2>
          </div>
          <div className="vgrid">
            <div className="vcard reveal"><div className="vn">01</div><h3>One source of truth</h3><p>Every team should work from the same live view of a campaign — no reconciling versions, no surprises.</p></div>
            <div className="vcard reveal"><div className="vn">02</div><h3>Automate the busywork</h3><p>Software should handle the manual, repetitive steps so people can spend their time on the decisions that matter.</p></div>
            <div className="vcard reveal"><div className="vn">03</div><h3>Built around you</h3><p>We connect to the partners and systems agencies already use, rather than asking them to start over.</p></div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="team">
        <div className="wrap">
          <div className="lbl reveal">The people behind it</div>
          <div className="team-row">
            {TEAM.map((m) => (
              <div className="member reveal" key={m.name}>
                <div className="top">
                  <div className="av" style={{ background: m.grad }}>{m.initial}</div>
                  <div><h3>{m.name}</h3><div className="role">{m.role}</div></div>
                </div>
                <p>{m.bio}</p>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener" className="li">
                  <LinkedIn /> Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="join">
        <div className="wrap">
          <div className="join-cta reveal">
            <h2>Come build with us.</h2>
            <p>We&apos;re always looking for people who want to help shape the future of modern TV advertising.</p>
            <Link href="/contact" className="btn lite">Get in touch <span className="ar">↗</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
