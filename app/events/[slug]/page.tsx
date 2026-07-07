import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CannesForm from "@/components/CannesForm";
import CannesHeroBg from "@/components/CannesHeroBg";
import { getEventBySlug, getEventDetailSlugs, isPastEvent } from "@/lib/events";
import "@/styles/form.css";
import "@/styles/cannes.css";
import "@/styles/events.css";

// One static page per event without a custom href. Adding an event to
// lib/events.ts and deploying generates its page automatically.
export function generateStaticParams() {
  return getEventDetailSlugs().map((slug) => ({ slug }));
}

// Pre-render the known event pages; allow new ones (added to lib/events.ts)
// to render on demand. Slugs that aren't real events — or that belong to an
// event with its own bespoke page (href) — 404 via notFound() below.
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.name} — Meet us`,
    description:
      event.blurb ?? `Meet the LightBoxTV team at ${event.name}, ${event.when} in ${event.location}.`,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  // Unknown slug, or an event with its own bespoke page (e.g. Cannes → /cannes).
  if (!event || event.href) notFound();

  const past = isPastEvent(event);

  // Past events: show a short note rather than a meeting form (the date has gone).
  if (past) {
    return (
      <>
        <SiteNav />
        <header className="ev-hero">
          <div className="glow a"></div>
          <div className="glow b"></div>
          <div className="wrap in">
            <span className="eyebrow">Past event · {event.start.slice(0, 4)}</span>
            <h1>{event.name}</h1>
            <p>
              This event has wrapped — {event.when}, {event.location}. See where we&apos;ll be next on our{" "}
              <Link href="/events" style={{ color: "var(--blue)", textDecoration: "underline" }}>
                events page
              </Link>
              .
            </p>
          </div>
        </header>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNav heroOverlay />

      <div className="cn-page">
        <section className="cn-hero">
          <CannesHeroBg image={event.heroImage ?? null} />

          <div className="wrap cn-grid">
            <div className="cn-copy">
              <span className="badge">
                <span className="live"></span> {event.start.slice(0, 4)} · Upcoming
              </span>
              <h1>{event.name}</h1>
              <p className="sub">
                {event.blurb ??
                  `Meet the LightBoxTV team at ${event.name}. Fill out the form to get in touch and schedule some time to connect.`}
              </p>
              <div className="cn-facts">
                <div className="fact">
                  <span className="i">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                      <path d="M16 2v4M8 2v4M3 10h18"></path>
                    </svg>
                  </span>
                  <span>
                    <span className="k">When</span>
                    <span className="v">{event.when}</span>
                  </span>
                </div>
                <div className="fact">
                  <span className="i">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                      <circle cx="12" cy="10" r="2.5"></circle>
                    </svg>
                  </span>
                  <span>
                    <span className="k">Where</span>
                    <span className="v">{event.location}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="cn-form-wrap">
              <CannesForm
                eventName={event.name}
                intro={`Tell us a little about you and we'll find a time to connect at ${event.name}.`}
              />
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
