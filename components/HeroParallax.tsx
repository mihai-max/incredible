"use client";

import { useEffect } from "react";

/**
 * Drifts the hero scene slightly slower than the page as you scroll.
 *
 * Targets `.hero__scene` from outside rather than wrapping it, so the dune SVG
 * stays in the server component and out of the client bundle. Skipped entirely
 * for visitors who prefer reduced motion.
 */
export default function HeroParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = document.querySelector<HTMLElement>(".hero__scene");
    if (!scene) return;

    let ticking = false;

    const apply = () => {
      const offset = Math.min(window.scrollY, window.innerHeight) * 0.18;
      scene.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      scene.style.transform = "";
    };
  }, []);

  return null;
}
