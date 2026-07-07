import type { Metadata } from "next";
import { ibmPlexMono } from "@/lib/fonts";
import TagTester from "@/components/TagTester";
import "@/styles/tag-tester.css";

export const metadata: Metadata = {
  title: "VAST Tag Tester",
  description:
    "Paste or fetch a VAST tag to preview the ad, inspect its media files and tracking events, and watch impression, quartile and click pixels fire in real time. Supports VAST 2.0–4.x inline & wrapper linear ads.",
  alternates: { canonical: "/tagtester" },
};

export default function TagTesterPage() {
  return (
    <div className={ibmPlexMono.variable}>
      <TagTester />
    </div>
  );
}
