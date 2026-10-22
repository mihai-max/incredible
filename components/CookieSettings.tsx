"use client";

import { gaId, reopen } from "@/lib/consent";

/** Footer link that brings the cookie banner back. */
export default function CookieSettings() {
  if (!gaId) return null;

  return (
    <button type="button" className="footer__consent" onClick={reopen}>
      Cookie settings
    </button>
  );
}
