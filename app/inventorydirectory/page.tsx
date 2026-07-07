import type { Metadata } from "next";
import { spaceMono } from "@/lib/fonts";
import InventoryDirectory from "@/components/InventoryDirectory";
import "@/styles/inventory-directory.css";

export const metadata: Metadata = {
  title: "TV Inventory Directory",
  description:
    "Explore the modern TV ecosystem — search broadcasters, streamers, FAST channels and CTV platforms to understand who they are, where they operate and what they offer.",
  alternates: { canonical: "/inventorydirectory" },
};

export default function InventoryDirectoryPage() {
  return (
    <div className={spaceMono.variable}>
      <InventoryDirectory />
    </div>
  );
}
