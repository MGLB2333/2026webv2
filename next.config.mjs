import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in the home dir makes Next guess the wrong workspace root;
  // pin it to this project. MDX is compiled at render time via
  // next-mdx-remote/rsc, so no MDX webpack config is needed here.
  outputFileTracingRoot: path.join(import.meta.dirname),
};

export default nextConfig;
