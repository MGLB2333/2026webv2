import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Locally, a stray package-lock.json in the home directory makes Next infer the
// wrong workspace root, so we pin it. On Vercel there is no such lockfile, and
// setting outputFileTracingRoot there breaks the Build Output routing (every
// route 404s despite a successful build) — so only apply it off Vercel.
if (!process.env.VERCEL) {
  nextConfig.outputFileTracingRoot = path.join(import.meta.dirname);
}

export default nextConfig;
