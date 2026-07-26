"use client";

import { useEffect } from "react";

/** Stagger step for elements revealed together. Maps to a CSS transition-delay. */
export type RevealDelay = 1 | 2 | 3;

/**
 * Fades sections in as they scroll into view.
 *
 * Mounted once, it observes every `[data-reveal]` element on the page rather
 * than wrapping each one in a component. That keeps all the section components
 * server-rendered — only this observer ships to the browser — and avoids adding
 * wrapper elements that would disturb the grid layouts.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
