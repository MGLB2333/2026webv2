import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import EventsUpcoming from "@/components/EventsUpcoming";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";
import "@/styles/events.css";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Where you'll find the LightBoxTV team. Meet us at the industry's biggest moments — or catch up on where we've been.",
  alternates: { canonical: "/events" },
};

// Re-evaluate the upcoming/past split daily so events move across without a redeploy.
export const revalidate = 86400;

function count(n: number, noun: string) {
  return `${n} ${noun}${n !== 1 ? "s" : ""}`;
}

export default function EventsPage() {
  const now = new Date();
  const upcoming = getUpcomingEvents(now);
  const past = getPastEvents(now);

  return (
    <>
      <SiteNav activeEvents />
      <ScrollReveal />

      <header className="ev-hero">
        <div className="wrap">
          <span className="eyebrow">Events</span>
          <h1>
            Where you&apos;ll find the <span className="hl sm">LightBoxTV</span> team.
          </h1>
          <p>
            We&apos;re out at the industry&apos;s biggest moments. Come and meet us — or catch up on
            where we&apos;ve been.
          </p>
        </div>
      </header>

      {/* Upcoming */}
      <section className="ev-sec ev-up reveal">
        <div className="wrap">
          <div className="ev-head">
            <div>
              <span className="lbl">Upcoming</span>
              <h2>Coming up next.</h2>
            </div>
            <span className="count">{count(upcoming.length, "upcoming event")}</span>
          </div>
          <EventsUpcoming items={upcoming} />
        </div>
      </section>

      {/* Past */}
      <section className="ev-sec ev-past reveal">
        <div className="wrap">
          <div className="ev-head">
            <div>
              <span className="lbl">Archive</span>
              <h2>Where we&apos;ve been.</h2>
            </div>
            <span className="count">{count(past.length, "past event")}</span>
          </div>
          <div className="past-list">
            {past.map((e) => (
              <div key={e.slug} className="prow">
                <div className="pl">
                  <span className="pyr">{e.start.slice(0, 4)}</span>
                  <span className="pname">{e.name}</span>
                </div>
                <div className="pr">
                  <span className="pmeta">
                    {e.when}  ·  {e.location}
                  </span>
                  <span className="ended">Ended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="ev-cta reveal">
        <div className="wrap">
          <div className="in">
            <h2>
              Meeting us at an event? <span className="hl sm">Let&apos;s talk.</span>
            </h2>
            <p>
              Book time with the LightBoxTV team and we&apos;ll show you how agencies plan, manage and
              measure modern TV in one place.
            </p>
            <Link href="/contact?reason=demo" className="btn primary">
              Book a meeting <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
