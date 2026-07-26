/**
 * Client-side bot heuristics for the contact form.
 *
 * IMPORTANT — what this is and is not.
 *
 * This site is a static export with no backend, so there is nothing to verify a
 * token against. Everything here runs in the visitor's browser and is therefore
 * trivially bypassed by anyone who bothers to read the source. It exists to stop
 * naive form-filling bots, which is the overwhelming majority of what a small
 * site sees. It is not a security control.
 *
 * If the form later posts to a real endpoint, replace this with Cloudflare
 * Turnstile or hCaptcha and verify the token server-side. See the README.
 *
 * The design rule here: a failed check must never reject a submission outright,
 * only escalate to the visible challenge. A false positive should cost someone
 * one extra step, never a lost enquiry.
 */

/** Below this, the form was filled faster than a person plausibly could. */
export const MIN_FILL_MS = 2500;

export type Signals = {
  /** When the form first appeared. */
  mountedAt: number;
  /** Whether any pointer, key, or touch input has been seen. */
  interacted: boolean;
  /** The honeypot field's value. Visitors never see it; bots fill it. */
  honeypot: string;
};

export type Verdict = {
  passed: boolean;
  /** Which heuristic tripped — useful when tuning, never shown to visitors. */
  reason?: "honeypot" | "no-interaction" | "too-fast";
};

export function assessHuman(signals: Signals, now: number = Date.now()): Verdict {
  if (signals.honeypot.trim() !== "") return { passed: false, reason: "honeypot" };
  if (!signals.interacted) return { passed: false, reason: "no-interaction" };
  if (now - signals.mountedAt < MIN_FILL_MS) return { passed: false, reason: "too-fast" };
  return { passed: true };
}

export type Challenge = { a: number; b: number; answer: number };

/**
 * An arithmetic challenge, deliberately chosen over image or audio puzzles:
 * it reads fine in a screen reader, needs no colour vision, works on a
 * keyboard, and adds nothing to the page weight.
 *
 * Single digits that sum past ten, so the answer is never guessable from
 * one operand and there is no carrying beyond one column.
 *
 * Call only in an event handler or effect — never during render, or the
 * server and client markup will disagree.
 */
export function makeChallenge(): Challenge {
  const a = 2 + Math.floor(Math.random() * 8); // 2–9
  const b = 2 + Math.floor(Math.random() * 8); // 2–9
  return { a, b, answer: a + b };
}

/** Lenient on formatting — spaces and stray characters shouldn't fail a human. */
export function isChallengeSolved(challenge: Challenge, input: string): boolean {
  const digits = input.replace(/[^\d-]/g, "");
  return digits !== "" && Number(digits) === challenge.answer;
}
