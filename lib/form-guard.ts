// Shared, dependency-free hardening for the public contact forms.
// Layered with the existing honeypot + field validation in each route.

/** Minimum time (ms) a human plausibly takes to fill a form. Faster = bot. */
const MIN_FILL_MS = 1500;

/** Per-field length ceilings; anything longer is payload-stuffing, not a real enquiry. */
export const FIELD_MAX: Record<string, number> = {
  first: 80,
  last: 80,
  email: 160,
  company: 120,
  title: 120,
  reason: 40,
  topic: 200,
  event: 120,
  message: 5000,
};

/** Verify the request originates from our own site (Origin/Referer host === Host). */
export function sameOrigin(request: Request): boolean {
  const host = request.headers.get("host");
  if (!host) return false;
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false; // a real browser fetch sends Origin (or at least Referer) on POST
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

/** True if a value carries CR/LF used for email header injection. */
export function hasInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}

/** First field name that exceeds its cap, or null if all are within limits. */
export function overLengthField(fields: Record<string, string>): string | null {
  for (const [key, value] of Object.entries(fields)) {
    const max = FIELD_MAX[key];
    if (typeof max === "number" && value.length > max) return key;
  }
  return null;
}

/** Anti-bot time trap. `elapsed` is the time in ms the CLIENT measured between
 *  the form rendering and submission (both from the client's own clock, so there
 *  is no client-vs-server clock-skew problem). We only reject when we have a
 *  reliable elapsed that's implausibly fast (a bot); a missing/garbage value
 *  fails OPEN so a real submission is never silently dropped. */
export function fillTimeOk(elapsed: unknown): boolean {
  const ms = Number(elapsed);
  if (!Number.isFinite(ms)) return true; // unknown — don't drop a legit submission
  return ms >= MIN_FILL_MS;
}
