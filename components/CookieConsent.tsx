"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { gaId, getChoice, isReopened, setChoice, subscribe } from "@/lib/consent";

/**
 * Cookie banner plus the Google Analytics loader it gates.
 *
 * The server snapshot reports "undecided-but-hidden", so the banner never
 * renders into the static HTML: returning visitors who already chose don't see
 * it flash, and without JavaScript there is neither a banner nor analytics.
 */
export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getChoice, () => "pending" as const);
  const reopened = useSyncExternalStore(subscribe, isReopened, () => false);

  if (!gaId || choice === "pending") return null;

  const showBanner = choice === null || reopened;

  return (
    <>
      {choice === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <section className="consent" role="region" aria-label="Cookie consent">
          <p className="consent__text">
            We&apos;d like to use Google Analytics to see which parts of the site get read. It
            sets cookies and only runs if you allow it.
          </p>
          <div className="consent__actions">
            <button
              type="button"
              className="btn btn--ghost consent__btn"
              onClick={() => setChoice("denied")}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn--cream consent__btn"
              onClick={() => setChoice("granted")}
            >
              Accept
            </button>
          </div>
        </section>
      )}
    </>
  );
}
