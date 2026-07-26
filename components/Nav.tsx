"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import { navLinks } from "@/lib/content";

/** Where the sliding pill should sit, in pixels within the link rail. */
type Bubble = { x: number; w: number };

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);
  const [hovered, setHovered] = useState<string | null>(null);
  const [bubble, setBubble] = useState<Bubble | null>(null);

  const railRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  /**
   * The pill follows the pointer when hovering and falls back to whichever
   * section is being read. Measuring the real element keeps it correct when the
   * labels change or the font renders differently than expected.
   */
  const measure = useCallback(() => {
    const target = linkRefs.current.get(hovered ?? active);
    if (!target) return;
    setBubble({ x: target.offsetLeft, w: target.offsetWidth });
  }, [hovered, active]);

  useEffect(measure, [measure]);

  /* Re-measure when the rail resizes — font swaps, zoom, breakpoint changes. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [measure]);

  /* Condense the nav once the page has moved. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on Escape, and if the viewport grows to desktop. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  /* Highlight the section currently being read. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}`}>
      <div className="nav__inner">
        <Brand />

        <nav
          className="nav__links"
          aria-label="Primary"
          ref={railRef}
          onPointerLeave={() => setHovered(null)}
        >
          <span
            className="nav__bubble"
            aria-hidden="true"
            data-ready={bubble ? "" : undefined}
            style={bubble ? { transform: `translateX(${bubble.x}px)`, width: bubble.w } : undefined}
          />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linkRefs.current.set(link.href, el);
                else linkRefs.current.delete(link.href);
              }}
              className={active === link.href ? "is-active" : undefined}
              onPointerEnter={() => setHovered(link.href)}
              onFocus={() => setHovered(link.href)}
              onBlur={() => setHovered(null)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav__cta" href="#contact">
          Let&apos;s talk
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__mobile" id="mobile-menu" hidden={!menuOpen}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nav__mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
