import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — `next build` emits plain HTML/CSS/JS into `out/`, which is
   * what GitHub Pages serves at incredible.website. No Node server at runtime.
   */
  output: "export",

  /** Pages has no image optimiser, so images must be served as authored. */
  images: { unoptimized: true },

  /** Emit `about/index.html` rather than `about.html` for clean static URLs. */
  trailingSlash: true,
};

export default nextConfig;
