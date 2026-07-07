export const siteConfig = {
  name: "LightBoxTV",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lightboxtv.com",
  tagline: "The operating system for modern TV advertising",
  description:
    "LightBoxTV is the operating system for modern TV advertising. Plan, manage and measure every TV advertising campaign in one place.",
  email: "Hello@lightboxtv.com",
  appUrl: "https://app.lightboxtv.com",
} as const;
