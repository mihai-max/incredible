import Brand from "./Brand";
import CookieSettings from "./CookieSettings";
import { navLinks, site } from "@/lib/content";

const footerLinks = [...navLinks, { href: "#faq", label: "FAQ" }];

export default function Footer() {
  // Baked at build time — this page is statically prerendered, so the year
  // advances when the site is next rebuilt rather than at midnight on New
  // Year's Eve.
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <Brand />
          <nav className="footer__links" aria-label="Footer">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <CookieSettings />
          <p className="footer__made">Designed &amp; built in {site.city}, Germany</p>
        </div>
      </div>
    </footer>
  );
}
