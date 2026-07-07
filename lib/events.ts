// ===========================================================================
// EVENTS — single source of truth (no CMS).
//
// To add an event: add one object to the `events` array below and deploy.
// It automatically appears in the right section of /events (Upcoming or Past,
// decided by its date) and — unless you point it at a custom page with `href` —
// gets its own detail page at /events/<slug> with a "request a meeting" form,
// styled like the Cannes page.
// ===========================================================================

export interface EventItem {
  /** URL slug — the detail page lives at /events/<slug>. Keep it unique + kebab-case. */
  slug: string;
  /** Event name shown everywhere. */
  name: string;
  /** ISO start date "YYYY-MM-DD". Used to sort and to decide upcoming vs past. */
  start: string;
  /** ISO end date "YYYY-MM-DD". Defaults to `start` for single-day events. */
  end?: string;
  /** Human-readable date label shown on cards and the detail page, e.g. "22 — 25 June 2026". */
  when: string;
  /** City, Country. */
  location: string;
  /** Small card thumbnail in /public (e.g. "/images/dmexco.jpg"). Falls back to a gradient.
      Fine to use an image with text/logos here — it's shown small. */
  image?: string;
  /** Detail-page hero / form background in /public. Use a clean, text-free photo —
      it's shown large behind the copy. Omit to keep the hero gradient-only (recommended
      when your card image has text). */
  heroImage?: string;
  /** Short blurb shown on the detail page hero. */
  blurb?: string;
  /** Card call-to-action label for upcoming events (e.g. "Book a meeting →"). */
  cta?: string;
  /** Point the card at a bespoke page instead of an auto-generated /events/<slug>.
      Internal paths start with "/" (e.g. "/cannes"); external start with "http". */
  href?: string;
}

export const events: EventItem[] = [
  {
    slug: "cannes-lions-2026",
    name: "Cannes Lions 2026",
    start: "2026-06-22",
    end: "2026-06-25",
    when: "22 — 25 June 2026",
    location: "Cannes, France",
    image: "/images/cannesimage.webp",
    blurb:
      "We'll be on the Croisette for Cannes Lions. Get in touch to schedule some time to connect with the LightBoxTV team.",
    cta: "Book a meeting →",
    href: "/cannes",
  },
  {
    slug: "madfest-london-2026",
    name: "MAD//Fest London 2026",
    start: "2026-07-07",
    end: "2026-07-09",
    when: "7 — 9 July 2026",
    location: "The Old Truman Brewery, London",
    image: "/images/madfest.jpeg",
    heroImage: "/images/madfesthero.jpg",
    blurb:
      "Catch the LightBoxTV team at MAD//Fest London at The Old Truman Brewery. Get in touch to schedule some time to connect.",
  },
  {
    slug: "google-see-tv-differently-july-2026",
    name: "Google: See TV, Differently",
    start: "2026-07-29",
    when: "29 July 2026",
    location: "Google St Giles, London",
    image: "/images/seetvgoogle.jpg",
    blurb:
      "Join the LightBoxTV team at Google's See TV, Differently at Google St Giles, London. Get in touch to schedule some time to connect.",
  },
  {
    slug: "dmexco-2026",
    name: "DMEXCO 2026",
    start: "2026-09-23",
    when: "23 September 2026",
    location: "Cologne, Germany",
    image: "/images/dmexco.jpg",
    blurb:
      "Meet the LightBoxTV team at DMEXCO to see how modern TV planning, buying and measurement come together in one platform.",
  },
  {
    slug: "videoweek-tv-rise-2026",
    name: "Videoweek: TV Rise",
    start: "2026-10-19",
    end: "2026-10-22",
    when: "19 — 22 October 2026",
    location: "Seville, Spain",
    image: "/images/tvrise.jpg",
    blurb:
      "Meet the LightBoxTV team at Videoweek: TV Rise in Seville. Get in touch to schedule some time to connect.",
  },
  {
    slug: "rakuten-tv-live-london-2026",
    name: "Rakuten TV Live London",
    start: "2026-06-09",
    when: "9 June 2026",
    location: "London, UK",
    image: "/images/rakutenlive.webp",
  },
  {
    slug: "lightboxtv-dentsu-data-partner-day-2026",
    name: "LightBoxTV & Dentsu present: Data Partner Day London",
    start: "2026-05-28",
    when: "28 May 2026",
    location: "London, UK",
    image: "/images/dentsudataday.jpg",
  },
  {
    slug: "lightboxtv-dentsu-data-partner-day-manchester-2026",
    name: "LightBoxTV & Dentsu present: Data Partner Day Manchester",
    start: "2026-03-12",
    when: "12 March 2026",
    location: "Manchester, UK",
    image: "/images/dentsudatadaymanchester.jpg",
  },
  {
    slug: "videoweek-new-video-frontiers-2026",
    name: "Videoweek: New Video Frontiers",
    start: "2026-04-15",
    end: "2026-04-16",
    when: "15 — 16 April 2026",
    location: "Kings Place, London",
    image: "/images/newvideofrontiers.jpg",
  },
  {
    slug: "connected-tv-world-summit-2026",
    name: "Connected TV World Summit",
    start: "2026-03-10",
    end: "2026-03-11",
    when: "10 — 11 March 2026",
    location: "Kings Place, London",
    image: "/images/ctvsummit.jpeg",
  },
  {
    slug: "google-see-tv-differently-2026",
    name: "Google: See TV, Differently",
    start: "2026-02-12",
    when: "12 February 2026",
    location: "Ham Yard Hotel, London",
    image: "/images/seetvgoogle.jpg",
  },
];

/** End-of-day Date for an event's last day (so an event counts as upcoming through its final day). */
function endDate(e: EventItem): Date {
  const d = new Date(e.end ?? e.start);
  d.setHours(23, 59, 59, 999);
  return d;
}

/** Upcoming events (ending today or later), soonest first. */
export function getUpcomingEvents(now: Date = new Date()): EventItem[] {
  return events
    .filter((e) => endDate(e) >= now)
    .sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

/** Past events (already ended), most recent first. */
export function getPastEvents(now: Date = new Date()): EventItem[] {
  return events
    .filter((e) => endDate(e) < now)
    .sort((a, b) => +new Date(b.start) - +new Date(a.start));
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function isPastEvent(e: EventItem, now: Date = new Date()): boolean {
  return endDate(e) < now;
}

/** Display year for an event (from its start date). */
export function eventYear(e: EventItem): string {
  return e.start.slice(0, 4);
}

/** Slugs that need an auto-generated detail page (everything without a custom href). */
export function getEventDetailSlugs(): string[] {
  return events.filter((e) => !e.href).map((e) => e.slug);
}
