"use client";

import { useState } from "react";
import { budgetOptions, site } from "@/lib/content";

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
 * Validates, then hands off to the visitor's mail client.
 *
 * There is no backend here. That works with zero infrastructure but depends on
 * the visitor having a mail client configured, so it will lose some enquiries —
 * see the README for swapping in a form service.
 */
export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [invalid, setInvalid] = useState<Set<FieldName>>(new Set());
  const [status, setStatus] = useState("");

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

      <button className="btn btn--cream btn--block" type="submit">
        Send enquiry
      </button>

      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
