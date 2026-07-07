import { Archivo, Hanken_Grotesk, Space_Mono, IBM_Plex_Mono } from "next/font/google";

// Self-hosted at build time by Next. Weights match the design
// (Archivo display now uses 500 alongside the heavier cuts).
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

// Used only by the CTV Supply Path Explorer tool (scoped at that route).
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Used only by the VAST Tag Tester tool (scoped at that route).
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
