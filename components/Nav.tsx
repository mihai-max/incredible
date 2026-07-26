"use client";

import { useEffect, useState } from "react";
import Brand from "./Brand";
import { navLinks } from "@/lib/content";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

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

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? "is-active" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav__cta" href="#contact">
          Start a project
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
          Start a project
        </a>
      </div>
    </header>
  );
}
