import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FindYourFit from "@/components/FindYourFit";
import "@/styles/find-your-fit.css";

export const metadata: Metadata = {
  title: "Find your fit",
  description:
    "Six quick questions to see which LightBoxTV workflows and modules fit your team — and the time you could save each week.",
  alternates: { canonical: "/find-your-fit" },
};

export default function FindYourFitPage() {
  return (
    <>
      <SiteNav />

      <header className="fyf-hero">
        <span className="eyebrow">Find your fit</span>
        <h1>
          Find your <span className="hl sm">LightBoxTV</span> fit.
        </h1>
        <p>
          Six quick questions. See which workflows LightBoxTV can improve, which modules fit, and
          the time you could save each week.
        </p>
      </header>

      <FindYourFit />

      <SiteFooter />
    </>
  );
}
