import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * No `output: "export"` here, deliberately.
   *
   * The contact form posts to /api/contact, which holds the Resend key and runs
   * server-side. A static export drops route handlers silently — the build
   * succeeds but `out/api/` is never written — so the endpoint would 404. That
   * is why this site is no longer deployable to GitHub Pages; see the README.
   */
  trailingSlash: true,
};

export default nextConfig;
