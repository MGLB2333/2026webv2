import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import { getAllPostMeta } from "@/lib/posts";
import "@/styles/home.css";

export default function HomePage() {
  const latest = getAllPostMeta().slice(0, 3);

  return (
    <>
      <SiteNav activeBlog />
      <ScrollReveal />

      {/* ===== HERO ===== */}
      <header className="hero" id="top">
        <div className="wrap hero-in">
          <h1 className="display">
            The operating system for
            <br />
            <span className="hl">TV advertising</span>
          </h1>
          <p className="sub">
            Plan, manage and measure every TV advertising campaign in one place. LightBoxTV brings
            fragmented workflows back together and gives every planner more time back.
          </p>
          <div className="cta-row">
            <Link href="/find-your-fit" className="btn ghost">
              Find your fit <span className="ar">→</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="stack">
        {/* ===== THE SHIFT (purple) ===== */}
        <section className="panel pp" id="problem">
          <div className="wrap pad">
            <div className="callout" data-reveal-group>
              <div className="c">
                <div className="w">Fragmented<span className="acc">.</span></div>
                <p>Plans split across spreadsheets, broadcaster portals, emails and decks.</p>
                <div className="bar" />
              </div>
              <div className="c">
                <div className="w">Complex<span className="acc">.</span></div>
                <p>More inventory, audiences and measurement options every year.</p>
                <div className="bar" />
              </div>
              <div className="c on">
                <div className="w">Connected<span className="acc">.</span></div>
                <p>LightBoxTV brings it all back together. One source of truth.</p>
                <div className="bar" />
              </div>
            </div>
            <h2 className="h2 statement reveal">
              We&apos;re bringing modern TV <span className="hl sm">back together.</span>
            </h2>
            <p className="stmt-sub reveal">
              TV planning has changed. What was a handful of linear channels is now dozens of
              platforms, formats and buying routes. LightBoxTV unifies planning, forecasting,
              collaboration and analytics so teams can move as one.
            </p>
          </div>
        </section>

        {/* ===== THE PLATFORM (cream) ===== */}
        <section className="panel cr" id="what">
          <div className="wrap pad">
            <div className="plat-head reveal">
              <span className="eyebrow">The platform</span>
              <h2 className="h2">
                Everything you need, <span className="hl p sm">all in one place.</span>
              </h2>
              <p className="lead">
                Plan, manage and measure every TV advertising campaign without switching between
                tools.
              </p>
            </div>
            <div className="plat-vgrid" data-reveal-group>
              <div className="pvcard">
                <div className="pv-ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></div>
                <h3>Plan with confidence</h3>
                <p>Build audiences, compare inventory and forecast reach across linear and connected TV.</p>
              </div>
              <div className="pvcard">
                <div className="pv-ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2.2" /></svg></div>
                <h3>Manage it all in one place</h3>
                <p>Create plans, manage deals and collaborate across planning and trading teams seamlessly.</p>
              </div>
              <div className="pvcard">
                <div className="pv-ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg></div>
                <h3>Measure across all video</h3>
                <p>Track performance, delivery and insights across every screen, in near real time.</p>
              </div>
              <div className="pvcard">
                <div className="pv-ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="M9 12l2 2 4-4" /></svg></div>
                <h3>One source of truth</h3>
                <p>Every campaign planned and measured in one connected platform your team can share.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE OUTCOME (green) ===== */}
        <section className="panel gr">
          <div className="wrap pad">
            <div className="outcome reveal">
              <span className="eyebrow">The outcome</span>
              <h2>
                Give planners <span className="hl d"><CountUp to={15} />+ hours</span> back every week.
              </h2>
              <p>
                By automating workflows, connecting systems and creating a single source of truth,
                LightBoxTV gives planning teams their time back.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MODULES (cream) ===== */}
        <section className="panel cr" id="platform">
          <div className="wrap pad">
            <div className="mod-head reveal">
              <span className="eyebrow">Inside the platform</span>
              <h2 className="h2">
                Run better TV with <span className="hl p sm">one workflow.</span>
              </h2>
              <p className="lead">
                From audience building to forecasting, trading and analytics, every step lives in one
                connected platform.
              </p>
            </div>
            <div className="mgrid" data-reveal-group>
              <div className="mcard"><div className="icot"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 11l2 2 4-4" /></svg></div><h4>Audience Builder</h4><p>Location, first and third party data, and the data marketplace.</p></div>
              <div className="mcard"><div className="icot"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h10" /></svg></div><h4>Planner</h4><p>Select inventory, forecast reach and allocate budget.</p></div>
              <div className="mcard"><div className="icot"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18v12H3zM3 7l3-3h12l3 3M9 12h6" /></svg></div><h4>Dealbook</h4><p>Manage pricing, inventory and commitments together.</p></div>
              <div className="mcard"><div className="icot"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg></div><h4>Analytics</h4><p>Reporting, reach and frequency, and cross platform performance.</p></div>
            </div>
          </div>
        </section>

        {/* ===== BENEFITS (dark) ===== */}
        <section className="panel dk" id="why">
          <div className="wrap pad">
            <div className="ben-head reveal">
              <span className="eyebrow">Why agencies choose LightBoxTV</span>
              <h2 className="h2">
                Turn complexity into <span className="hl sm">confidence.</span>
              </h2>
              <p className="lead">And hours of manual work into minutes.</p>
            </div>
            <div className="bgrid" data-reveal-group>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg></div><h4>Focus on Strategy</h4><p>Replace manual planning and reporting steps with automated workflows.</p></div>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div><h4>Reduce errors</h4><p>Cut duplication and rework with one connected source of truth.</p></div>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 11l2 2 4-4" /></svg></div><h4>Audience led plans</h4><p>Build audiences and forecast reach in a fraction of the time.</p></div>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg></div><h4>A holistic view</h4><p>See campaign performance across every screen, in near real time.</p></div>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2" /></svg></div><h4>Fits your stack</h4><p>Connects with the existing agency systems and tools your teams use.</p></div>
              <div className="bcell"><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="9" r="2.4" /><circle cx="16" cy="9" r="2.4" /><path d="M3 19a5 5 0 0 1 10 0M13 19a5 5 0 0 1 8-4" /></svg></div><h4>Teams in sync</h4><p>Improve collaboration across planning, trading and analytics.</p></div>
            </div>
          </div>
        </section>

        {/* ===== LATEST NEWS (cream) ===== */}
        <section className="panel cr" id="news">
          <div className="wrap pad">
            <div className="news-head reveal">
              <div>
                <span className="eyebrow">In the news</span>
                <h2 className="h2">Latest news.</h2>
              </div>
              <Link href="/blog" className="btn line">
                View all posts <span className="ar">↗</span>
              </Link>
            </div>
            <div className="news-list" data-reveal-group>
              {latest.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="nrow">
                  <div className="nl">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nt">{post.title}</span>
                  </div>
                  <div className="nr">
                    <span className="meta">
                      {post.category}
                      {post.formattedDate ? ` · ${post.formattedDate}` : ""}
                    </span>
                    <span className="arc">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BIG CTA (orange) ===== */}
        <section className="panel or" id="demo">
          <div className="wrap pad-sm">
            <div className="bigcta reveal">
              <Link href="/contact?reason=demo"><h3>Book<br />a demo</h3><span className="arc">↗</span></Link>
              <Link href="/contact"><h3>Contact<br />us</h3><span className="arc">↗</span></Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
