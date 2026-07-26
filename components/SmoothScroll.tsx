"use client";

import { useEffect } from "react";

/**
 * Whether the visitor's "reduce motion" setting turns the eased scroll off.
 *
 * Scrolling the whole viewport is large-field motion, which is exactly what
 * that preference exists to stop — so this defaults to `true` and such visitors
 * get an instant jump instead.
 *
 * The catch: if *you* have reduce motion enabled in your OS (macOS: Settings →
 * Accessibility → Display → Reduce motion; Windows: Accessibility → Visual
 * effects → Animation effects), you will never see the eased scroll on your own
 * site. Check with this in the browser console:
 *
 *   matchMedia('(prefers-reduced-motion: reduce)').matches
 *
 * Set this to `false` to ease for everyone regardless. That is a real
 * accessibility trade-off, not just a preference — make it deliberately.
 */
const RESPECT_REDUCED_MOTION = true;

/** Sits between these bounds; longer jumps take longer, but not proportionally. */
const MIN_DURATION = 520;
const MAX_DURATION = 1250;

/**
 * Ease-in-out on a cubic curve: starts slow, accelerates through the middle,
 * settles rather than stopping dead. This is what gives the scroll its ramp.
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Animated in-page scrolling.
 *
 * The browser's native `scroll-behavior: smooth` moves at an almost constant
 * rate; this ramps in and out, and scales duration with distance so a jump to
 * the footer doesn't crawl and a short hop doesn't feel sluggish.
 *
 * Mounted once and delegated from the document, so every in-page anchor is
 * covered without each component knowing about it.
 */
export default function SmoothScroll({
  /** Space to leave above the target for whatever is pinned to the top. */
  offset = 104,
}: {
  offset?: number;
}) {
  useEffect(() => {
    if (RESPECT_REDUCED_MOTION && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const scrollTo = (targetY: number) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      // Longer distances get more time, but sub-linearly — otherwise a
      // full-page jump would take several seconds.
      const duration = Math.min(
        MAX_DURATION,
        Math.max(MIN_DURATION, Math.sqrt(Math.abs(distance)) * 34),
      );

      const start = performance.now();
      cancelAnimationFrame(frame);

      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        window.scrollTo({
          top: startY + distance * easeInOutCubic(progress),
          // Explicitly instant: the CSS `scroll-behavior: smooth` fallback
          // would otherwise fight this animation frame by frame.
          behavior: "instant",
        });
        if (progress < 1) frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      // Let the browser handle modified clicks (new tab, download, etc).
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href?.startsWith("#") || href === "#") return;

      // Same-document links only; cross-page links like "/#work" navigate.
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      scrollTo(Math.max(0, top));

      // Keep the URL and focus behaviour of a real anchor jump.
      history.pushState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, [offset]);

  return null;
}
