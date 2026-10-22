import type { Metadata, Viewport } from "next";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: "Cinematic, fast, conversion-focused websites for ambitious brands.",
    url: "/",
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: {
      url:
        "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#050505"/><path d="M16 7l8 18H8z" fill="#ff5c1a"/></svg>`,
        ),
      type: "image/svg+xml",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Reveal animations start at opacity 0 and are switched on by an
          IntersectionObserver. Without JS that would leave the page blank, so
          make everything visible up front when scripting is unavailable.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
