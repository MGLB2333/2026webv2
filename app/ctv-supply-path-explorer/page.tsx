import type { Metadata } from "next";
import { spaceMono } from "@/lib/fonts";
import CtvExplorer from "@/components/CtvExplorer";
import "@/styles/ctv-explorer.css";

export const metadata: Metadata = {
  title: "CTV Supply Path Explorer",
  description:
    "Trace the routes from CTV inventory to demand — map the SSPs and DSPs that connect broadcasters, streaming and FAST inventory to buyers.",
  alternates: { canonical: "/ctv-supply-path-explorer" },
};

export default function CtvSupplyPathExplorerPage() {
  return (
    <div className={spaceMono.variable}>
      <CtvExplorer />
    </div>
  );
}
