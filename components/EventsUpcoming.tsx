"use client";

import Link from "next/link";
import { useState } from "react";
import type { EventItem } from "@/lib/events";

const GRADS = [
  "linear-gradient(150deg,#C2F042,#3A7A0E)",
  "linear-gradient(150deg,#7C3AED,#241A4A)",
  "linear-gradient(150deg,#F4502A,#7C3AED)",
  "linear-gradient(150deg,#241A4A,#16151B)",
  "linear-gradient(150deg,#7C3AED,#C2F042)",
];

function Pin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** Upcoming events: a sticky preview card driven by hovering the line-up list.
    The soonest event (index 0) carries the "Next up" flag. */
export default function EventsUpcoming({ items }: { items: EventItem[] }) {
  const [hover, setHover] = useState(0);

  if (!items.length) {
    return <p style={{ color: "var(--muted)", fontSize: 15 }}>Nothing on the calendar right now.</p>;
  }

  const hi = Math.min(hover, items.length - 1);
  const pv = items[hi];
  const isNext = hi === 0;
  const cta = pv.cta?.replace(/\s*→\s*$/, "") || (isNext ? "Book a meeting" : "View details");
  const href = pv.href || `/events/${pv.slug}`;

  return (
    <div className="ev-cols">
      {/* sticky preview */}
      <div className="epreview">
        <div className="cover" style={{ background: GRADS[hi % GRADS.length] }}>
          {pv.image ? <img className="cover-img" src={pv.image} alt="" /> : null}
          {isNext && (
            <span className="nextpill">
              <span className="d" /> Next up
            </span>
          )}
          <span className="yr">{pv.start.slice(0, 4)}</span>
        </div>
        <span className="ename">{pv.name}</span>
        <div className="einfo">
          <span className="when">{pv.when}</span>
          <span className="loc">
            <Pin /> {pv.location}
          </span>
        </div>
        {href.startsWith("/") ? (
          <a className="btn ink ebtn" href={href}>
            {cta} <span className="ar">↗</span>
          </a>
        ) : (
          <a className="btn ink ebtn" href={href} target="_blank" rel="noopener">
            {cta} <span className="ar">↗</span>
          </a>
        )}
      </div>

      {/* line-up list */}
      <div>
        <div className="lu-head">
          <span className="lbl">The line-up</span>
          <span className="hint">Hover to preview</span>
        </div>
        {items.map((e, i) => {
          const to = e.href || `/events/${e.slug}`;
          const rowClass = `erow ${i === hi ? "on" : ""}`.trim();
          const inner = (
            <>
              <div className="el">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div style={{ minWidth: 0 }}>
                  <span className="ename2">{e.name}</span>
                  <span className="emeta">
                    {e.when}  ·  {e.location}
                  </span>
                </div>
              </div>
              <span className="arc">→</span>
            </>
          );
          return to.startsWith("/") ? (
            <Link key={e.slug} href={to} className={rowClass} onMouseEnter={() => setHover(i)}>
              {inner}
            </Link>
          ) : (
            <a
              key={e.slug}
              href={to}
              target="_blank"
              rel="noopener"
              className={rowClass}
              onMouseEnter={() => setHover(i)}
            >
              {inner}
            </a>
          );
        })}
      </div>
    </div>
  );
}
