"use client";

import { useEffect, useRef, useState } from "react";

interface CannesFormProps {
  /** When set, included with the submission so the email names the event. */
  eventName?: string;
  /** Card heading + intro overrides (defaults suit the Cannes page). */
  heading?: string;
  intro?: string;
}

export default function CannesForm({ eventName, heading, intro }: CannesFormProps = {}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Client-measured time the form was on screen, so the server can reject instant
  // (bot) submits without relying on the client and server clocks agreeing.
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    setError("");

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.elapsed = String(mountedAt.current ? Date.now() - mountedAt.current : "");

    try {
      const res = await fetch("/api/cannes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <div className={`form-fields ${sent ? "hide" : ""}`.trim()}>
        <div className="fc-head">
          <h2>{heading ?? "Request a meeting"}</h2>
          <p>{intro ?? "Tell us a little about you and we'll find a time to connect on the Croisette."}</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from users, catches bots. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="company_url">Company website</label>
            <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {eventName && <input type="hidden" name="event" value={eventName} />}
          <div className="form-row">
            <div className="field">
              <label htmlFor="first">First name <span className="req">*</span></label>
              <input id="first" name="first" type="text" placeholder="Jane" required maxLength={80} />
            </div>
            <div className="field">
              <label htmlFor="last">Last name <span className="req">*</span></label>
              <input id="last" name="last" type="text" placeholder="Doe" required maxLength={80} />
            </div>
          </div>
          <div className="field full">
            <label htmlFor="title">Job title <span className="req">*</span></label>
            <input id="title" name="title" type="text" placeholder="Head of TV Planning" required maxLength={120} />
          </div>
          <div className="field full">
            <label htmlFor="company">Company name <span className="req">*</span></label>
            <input id="company" name="company" type="text" placeholder="Agency name" required maxLength={120} />
          </div>
          <div className="field full">
            <label htmlFor="email">Email address <span className="req">*</span></label>
            <input id="email" name="email" type="email" placeholder="jane@agency.com" required maxLength={160} />
          </div>
          <div className="field full">
            <label htmlFor="topic">Meeting topic</label>
            <input id="topic" name="topic" type="text" placeholder="What would you like to talk about?" maxLength={200} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn dark" disabled={submitting}>
              {submitting ? "Sending…" : <>Request a meeting <span className="ar">↗</span></>}
            </button>
            <span className="form-note">We&apos;ll be in touch to confirm a time.</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      </div>
      <div className={`form-success ${sent ? "show" : ""}`.trim()}>
        <div className="tick">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3>See you in Cannes.</h3>
        <p>Thanks — your request is in. Our team will reach out to lock in a time to meet on the Croisette.</p>
      </div>
    </div>
  );
}
