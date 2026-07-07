"use client";

import { useEffect, useRef, useState } from "react";

const REASONS = [
  { value: "demo", label: "Book a demo" },
  { value: "sales", label: "Talk to sales" },
  { value: "press", label: "Press & media" },
  { value: "partnership", label: "Partnerships" },
  { value: "support", label: "Product support" },
  { value: "other", label: "Something else" },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Client-measured time the form was on screen, so the server can reject instant
  // (bot) submits without relying on the client and server clocks agreeing.
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    // Preselect the enquiry reason from ?reason= without forcing dynamic rendering.
    const r = new URLSearchParams(window.location.search).get("reason");
    if (r && REASONS.some((o) => o.value === r)) setReason(r);
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card reveal">
      <div className={`form-fields ${sent ? "hide" : ""}`.trim()}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from users, catches bots. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="company_url">Company website</label>
            <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
          </div>
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
          <div className="form-row">
            <div className="field">
              <label htmlFor="email">Work email <span className="req">*</span></label>
              <input id="email" name="email" type="email" placeholder="jane@agency.com" required maxLength={160} />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" placeholder="Agency name" maxLength={120} />
            </div>
          </div>
          <div className="field full">
            <label htmlFor="reason">What can we help with? <span className="req">*</span></label>
            <select
              id="reason"
              name="reason"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="" disabled>Select a reason</option>
              {REASONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="message">Message <span className="req">*</span></label>
            <textarea id="message" name="message" placeholder="Tell us a little about what you're looking for…" required maxLength={5000}></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn dark" disabled={submitting}>
              {submitting ? "Sending…" : <>Send message <span className="ar">↗</span></>}
            </button>
            <span className="form-note">By submitting, you agree to be contacted about your enquiry.</span>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      </div>
      <div className={`form-success ${sent ? "show" : ""}`.trim()}>
        <div className="tick">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3>Thanks, we&apos;ve got it.</h3>
        <p>Your message is on its way to our team. We&apos;ll be in touch shortly at the email you provided.</p>
      </div>
    </div>
  );
}
