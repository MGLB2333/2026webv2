import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sameOrigin, hasInjection, overLengthField, fillTimeOk } from "@/lib/form-guard";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@lightboxtv.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "LightBoxTV Website <onboarding@resend.dev>";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Cannes form: RESEND_API_KEY is not set.");
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
  const title = String(data.title ?? "").trim();
  const company = String(data.company ?? "").trim();
  const email = String(data.email ?? "").trim();
  const topic = String(data.topic ?? "").trim();
  const event = String(data.event ?? "").trim();

  const overLong = overLengthField({ first, last, title, company, email, topic, event });
  if (overLong) {
    return NextResponse.json({ error: "One of your fields is too long." }, { status: 400 });
  }

  if (!first || !last || !title || !company || !email) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!isEmail(email) || hasInjection(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const name = `${first} ${last}`;
  const eventLabel = event || "Cannes";

  const lines = [
    `Event: ${eventLabel}`,
    `Name: ${name}`,
    `Job title: ${title}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Meeting topic: ${topic || "—"}`,
  ];

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `${eventLabel} meeting request — ${name}, ${company}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Cannes form: Resend error", error);
      return NextResponse.json({ error: "Something went wrong sending your request." }, { status: 502 });
    }
  } catch (err) {
    console.error("Cannes form: unexpected error", err);
    return NextResponse.json({ error: "Something went wrong sending your request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
