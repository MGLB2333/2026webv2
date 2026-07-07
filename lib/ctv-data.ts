/* CTV Supply Path Explorer — dataset (illustrative, June 2026) */

export interface InvNode { id: string; name: string; kind: string; mono: string; }
export interface FlowNode { id: string; name: string; mono: string; }
export type Badge = "Direct" | "Curated" | "Resold" | "Exclusive";

const inventory: InvNode[] = [
  { id: "itvx", name: "ITVX", kind: "Broadcaster", mono: "IT" },
  { id: "c4", name: "Channel 4", kind: "Broadcaster", mono: "C4" },
  { id: "my5", name: "My5", kind: "Broadcaster", mono: "M5" },
  { id: "sky", name: "Sky", kind: "Broadcaster", mono: "SK" },
  { id: "netflix", name: "Netflix", kind: "Streaming", mono: "NF" },
  { id: "disney", name: "Disney+", kind: "Streaming", mono: "D+" },
  { id: "pluto", name: "Pluto TV", kind: "FAST", mono: "PL" },
  { id: "rakuten", name: "Rakuten TV", kind: "Streaming", mono: "RK" },
  { id: "samsung", name: "Samsung TV Plus", kind: "FAST", mono: "S+" },
  { id: "lg", name: "LG Channels", kind: "FAST", mono: "LG" },
  { id: "tubi", name: "Tubi", kind: "FAST", mono: "TB" },
];

const ssps: FlowNode[] = [
  { id: "magnite", name: "Magnite", mono: "MG" },
  { id: "freewheel", name: "FreeWheel", mono: "FW" },
  { id: "pubmatic", name: "PubMatic", mono: "PM" },
  { id: "index", name: "Index Exchange", mono: "IX" },
  { id: "equativ", name: "Equativ", mono: "EQ" },
  { id: "openx", name: "OpenX", mono: "OX" },
  { id: "triplelift", name: "TripleLift", mono: "TL" },
];

const dsps: FlowNode[] = [
  { id: "dv360", name: "DV360", mono: "DV" },
  { id: "ttd", name: "The Trade Desk", mono: "TD" },
  { id: "yahoo", name: "Yahoo DSP", mono: "YH" },
  { id: "xandr", name: "Xandr", mono: "XR" },
  { id: "amazon", name: "Amazon DSP", mono: "AM" },
];

// inventory -> ssp links with a relationship badge
const invSsp: [string, string, Badge][] = [
  ["itvx", "magnite", "Direct"], ["itvx", "freewheel", "Direct"], ["itvx", "pubmatic", "Curated"], ["itvx", "openx", "Resold"],
  ["c4", "magnite", "Direct"], ["c4", "freewheel", "Direct"], ["c4", "index", "Curated"],
  ["my5", "freewheel", "Direct"], ["my5", "pubmatic", "Curated"], ["my5", "equativ", "Resold"],
  ["sky", "magnite", "Direct"], ["sky", "freewheel", "Exclusive"], ["sky", "pubmatic", "Curated"], ["sky", "index", "Resold"],
  ["netflix", "magnite", "Exclusive"], ["netflix", "freewheel", "Direct"], ["netflix", "index", "Curated"],
  ["disney", "magnite", "Direct"], ["disney", "pubmatic", "Curated"], ["disney", "openx", "Resold"],
  ["pluto", "magnite", "Direct"], ["pluto", "freewheel", "Curated"], ["pluto", "triplelift", "Resold"],
  ["rakuten", "pubmatic", "Direct"], ["rakuten", "equativ", "Curated"], ["rakuten", "openx", "Resold"],
  ["samsung", "magnite", "Direct"], ["samsung", "pubmatic", "Curated"], ["samsung", "equativ", "Resold"], ["samsung", "triplelift", "Curated"],
  ["lg", "magnite", "Direct"], ["lg", "pubmatic", "Curated"], ["lg", "openx", "Resold"],
  ["tubi", "magnite", "Direct"], ["tubi", "freewheel", "Curated"], ["tubi", "index", "Resold"],
];

// ssp -> dsp links
const sspDsp: [string, string][] = [
  ["magnite", "dv360"], ["magnite", "ttd"], ["magnite", "yahoo"], ["magnite", "amazon"],
  ["freewheel", "dv360"], ["freewheel", "ttd"], ["freewheel", "xandr"],
  ["pubmatic", "dv360"], ["pubmatic", "ttd"], ["pubmatic", "yahoo"],
  ["index", "ttd"], ["index", "dv360"], ["index", "xandr"],
  ["equativ", "dv360"], ["equativ", "yahoo"],
  ["openx", "dv360"], ["openx", "ttd"], ["openx", "amazon"],
  ["triplelift", "ttd"], ["triplelift", "yahoo"],
];

function dealsFor(badge: string): string[] {
  if (badge === "Exclusive") return ["Programmatic Guaranteed", "Private Auction (PMP)"];
  if (badge === "Direct") return ["Programmatic Guaranteed", "Preferred Deal", "Private Auction (PMP)", "Open Auction"];
  if (badge === "Curated") return ["Curated PMP", "Private Auction (PMP)", "Open Auction"];
  return ["Private Auction (PMP)", "Open Auction"]; // Resold
}

export const CTV_DATA = {
  inventory,
  ssps,
  dsps,
  invSsp,
  sspDsp,
  dealsFor,
  updated: "June 2026",
};
