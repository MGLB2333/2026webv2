import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sameOrigin, hasInjection, overLengthField, fillTimeOk } from "@/lib/form-guard";

export const runtime = "nodejs";

const REASON_LABELS: Record<string, string> = {
  demo: "Book a demo",
  sales: "Talk to sales",
  press: "Press & media",
  partnership: "Partnerships",
  support: "Product support",
  other: "Something else",
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@lightboxtv.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "LightBoxTV Website <onboarding@resend.dev>";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  // Only accept submissions that originate from our own site.
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot + time trap: silently accept so bots don't learn why they failed.
  const honeypotTripped = typeof data.company_url === "string" && data.company_url.trim() !== "";
  if (honeypotTripped || !fillTimeOk(data.elapsed)) {
    return NextResponse.json({ ok: true });
  }

  const first = String(data.first ?? "").trim();
  const last = String(data.last ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const reason = String(data.reason ?? "").trim();
  const message = String(data.message ?? "").trim();

  const overLong = overLengthField({ first, last, email, company, reason, message });
  if (overLong) {
    return NextResponse.json({ error: "One of your fields is too long." }, { status: 400 });
  }

  if (!first || !last || !email || !reason || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!isEmail(email) || hasInjection(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const reasonLabel = REASON_LABELS[reason] ?? reason;
  const name = `${first} ${last}`;

  const lines = [
    `Reason: ${reasonLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    "",
    "Message:",
    message,
  ];

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry: ${reasonLabel} — ${name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
