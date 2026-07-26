"use client";

import { useEffect, useRef, useState } from "react";
import { budgetOptions, site } from "@/lib/content";
import {
  assessHuman,
  isChallengeSolved,
  makeChallenge,
  type Challenge,
} from "@/lib/humanCheck";

type Fields = { name: string; email: string; budget: string; brief: string };
type FieldName = keyof Fields;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty: Fields = {
  name: "",
  email: "",
  budget: budgetOptions[1],
  brief: "",
};

/**
 * Validates, screens for bots, then hands off to the visitor's mail client.
 *
 * Bot screening is invisible by default (honeypot, interaction, timing) and
 * escalates to an arithmetic challenge rather than rejecting — see
 * lib/humanCheck.ts for why, and for what this does and doesn't protect.
 *
 * There is no backend here. That works with zero infrastructure but depends on
 * the visitor having a mail client configured, so it will lose some enquiries —
 * see the README for swapping in a form service.
 */
export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [invalid, setInvalid] = useState<Set<FieldName>>(new Set());
  const [status, setStatus] = useState("");

  // Bot screening state.
  const [honeypot, setHoneypot] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [challengeInput, setChallengeInput] = useState("");
  const [challengeError, setChallengeError] = useState("");

  const mountedAt = useRef(0);
  const interacted = useRef(false);
  const challengeRef = useRef<HTMLInputElement>(null);

  /* Start the clock and watch for any sign of a real input device. */
  useEffect(() => {
    mountedAt.current = Date.now();

    const seen = () => {
      interacted.current = true;
    };
    const events = ["pointerdown", "pointermove", "keydown", "touchstart"] as const;
    events.forEach((type) =>
      window.addEventListener(type, seen, { once: true, passive: true }),
    );
    return () => events.forEach((type) => window.removeEventListener(type, seen));
  }, []);

  /* Move focus to the challenge when it appears, so it isn't missed. */
  useEffect(() => {
    if (challenge) challengeRef.current?.focus();
  }, [challenge]);

  const update = (field: FieldName, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    // Clear the error as soon as they start correcting it.
    setInvalid((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  const send = () => {
    const subject = `New project enquiry — ${fields.name.trim()}`;
    const body = [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      `Budget: ${fields.budget}`,
      "",
      fields.brief.trim(),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("Opening your email client — send it and we'll reply within a day.");
    setFields(empty);
    setChallenge(null);
    setChallengeInput("");
    setChallengeError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const missing: FieldName[] = [];
    const malformed: FieldName[] = [];

    if (!fields.name.trim()) missing.push("name");
    if (!fields.brief.trim()) missing.push("brief");

    if (!fields.email.trim()) missing.push("email");
    else if (!EMAIL.test(fields.email.trim())) malformed.push("email");

    if (missing.length || malformed.length) {
      setInvalid(new Set([...missing, ...malformed]));
      setStatus(
        missing.length
          ? "Please fill in the highlighted fields."
          : "That email address doesn't look right.",
      );
      document.getElementById(missing[0] ?? malformed[0])?.focus();
      return;
    }

    // A challenge is already on screen: it has to be answered.
    if (challenge) {
      if (!isChallengeSolved(challenge, challengeInput)) {
        setChallenge(makeChallenge());
        setChallengeInput("");
        setChallengeError("Not quite — here's another one.");
        return;
      }
      send();
      return;
    }

    // Invisible screening. Failing escalates rather than rejects.
    if (!assessHuman({ mountedAt: mountedAt.current, interacted: interacted.current, honeypot }).passed) {
      setChallenge(makeChallenge());
      setChallengeInput("");
      setChallengeError("");
      setStatus("One quick check before this sends.");
      return;
    }

    send();
  };

  const flag = (field: FieldName) => (invalid.has(field) ? true : undefined);

  return (
    <form className="form" onSubmit={handleSubmit} noValidate data-reveal="" data-reveal-delay={2}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Okafor"
          value={fields.name}
          aria-invalid={flag("name")}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          value={fields.email}
          aria-invalid={flag("email")}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="budget">Budget</label>
        <select
          id="budget"
          name="budget"
          value={fields.budget}
          onChange={(e) => update("budget", e.target.value)}
        >
          {budgetOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="brief">Project</label>
        <textarea
          id="brief"
          name="brief"
          rows={5}
          placeholder="What are you building, and what's in the way?"
          value={fields.brief}
          aria-invalid={flag("brief")}
          onChange={(e) => update("brief", e.target.value)}
        />
      </div>

      {/*
        Honeypot. Positioned off-screen rather than display:none — naive bots
        skip hidden fields but happily fill positioned ones. Hidden from
        assistive tech and removed from the tab order, so no visitor meets it.
      */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {challenge ? (
        <div className="challenge">
          <label className="challenge__q" htmlFor="challenge">
            Quick check — what is {challenge.a} + {challenge.b}?
          </label>
          <input
            id="challenge"
            ref={challengeRef}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Answer"
            value={challengeInput}
            aria-invalid={challengeError ? true : undefined}
            aria-describedby={challengeError ? "challenge-error" : undefined}
            onChange={(e) => {
              setChallengeInput(e.target.value);
              if (challengeError) setChallengeError("");
            }}
          />
          {challengeError ? (
            <p className="challenge__error" id="challenge-error" role="alert">
              {challengeError}
            </p>
          ) : null}
        </div>
      ) : null}

      <button className="btn btn--cream btn--block" type="submit">
        {challenge ? "Confirm and send" : "Send enquiry"}
      </button>

      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
