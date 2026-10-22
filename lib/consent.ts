/**
 * Analytics consent, kept in localStorage and shared through a tiny store so
 * the banner and the footer's "Cookie settings" link stay in sync.
 *
 * Nothing is sent to Google until the visitor accepts: the gtag script is not
 * even requested before then.
 */

/**
 * GA4 measurement ID. Unset means no analytics and no banner. It's pasted into
 * an inline script, so anything that isn't shaped like an ID is dropped.
 */
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
export const gaId = /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : "";

export type Choice = "granted" | "denied";

const KEY = "consent.analytics";

const listeners = new Set<() => void>();
let reopened = false;

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changed its mind.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** The stored choice, or null if the visitor hasn't made one yet. */
export function getChoice(): Choice | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Storage blocked (private mode, site data disabled): ask every visit.
    return null;
  }
}

export function isReopened() {
  return reopened;
}

export function setChoice(choice: Choice) {
  const previous = getChoice();
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // Can't persist it; the choice still holds for this page view.
  }
  reopened = false;
  emit();

  // Withdrawing consent has to stop collection now, not on the next visit.
  if (previous === "granted" && choice === "denied") {
    clearAnalyticsCookies();
    window.location.reload();
  }
}

/** Shows the banner again so the visitor can change their choice. */
export function reopen() {
  reopened = true;
  emit();
}

/** Removes the _ga cookies GA4 set on this domain and its parents. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const parts = window.location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}
