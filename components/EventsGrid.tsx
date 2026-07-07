"use client";

import Link from "next/link";
import { useState } from "react";
import type { EventItem } from "@/lib/events";

const GRADS = [
  "linear-gradient(150deg,#7C3AED,#C2F042)",
  "linear-gradient(150deg,#7C3AED,#4C1D95)",
  "linear-gradient(150deg,#C2F042,#6D28D9)",
  "linear-gradient(150deg,#4C1D95,#7C3AED)",
  "linear-gradient(150deg,#7C3AED,#7C3AED)",
];

function Pin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CardInner({ e, i, past, isNext }: { e: EventItem; i: number; past: boolean; isNext: boolean }) {
  return (
    <>
      <div className="top">
        {e.image ? (
          <img src={e.image} alt={e.name} />
        ) : (
          <div className="g" style={{ background: GRADS[i % GRADS.length] }}></div>
        )}
        {isNext && (
          <span className="nextpill">
            <span className="d"></span> Next up
          </span>
        )}
        <span className="yr">{e.start.slice(0, 4)}</span>
      </div>
      <div className="b">
        <div className="when">{e.when}</div>
        <h4>{e.name}</h4>
        <span className="loc">
          <Pin /> {e.location}
        </span>
        <span className="more">{past ? "Event ended" : e.cta || "View details →"}</span>
      </div>
    </>
  );
}

function Card({ e, i, past, isNext }: { e: EventItem; i: number; past: boolean; isNext: boolean }) {
  if (past) {
    return (
      <div className="ecard past">
        <CardInner e={e} i={i} past={past} isNext={false} />
      </div>
    );
  }
  const target = e.href || `/events/${e.slug}`;
  const inner = <CardInner e={e} i={i} past={past} isNext={isNext} />;
  if (target.startsWith("/")) {
    return (
      <Link className="ecard link" href={target}>
        {inner}
      </Link>
    );
  }
  return (
    <a className="ecard link" href={target}>
      {inner}
    </a>
  );
}

interface EventsGridProps {
  items: EventItem[];
  /** How many to show before "show more". */
  initial: number;
  past?: boolean;
  /** Slug of the event that should carry the "Next up" pill. */
  nextSlug?: string;
}

export default function EventsGrid({ items, initial, past = false, nextSlug }: EventsGridProps) {
  const [expanded, setExpanded] = useState(false);

  if (!items.length) {
    return <p style={{ color: "var(--muted)", fontSize: 15 }}>Nothing to show yet.</p>;
  }

  const shown = expanded ? items : items.slice(0, initial);
  const hasMore = items.length > initial;

  return (
    <>
      <div className="ev-grid">
        {shown.map((e, i) => (
          <Card key={e.slug} e={e} i={i} past={past} isNext={!past && e.slug === nextSlug} />
        ))}
      </div>
      {hasMore && (
        <div className="showmore-wrap">
          <button className="showmore" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show less" : `Show all ${items.length} events`}
            <span className="ic">{expanded ? "−" : "+"}</span>
          </button>
        </div>
      )}
    </>
  );
}
