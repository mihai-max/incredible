/**
 * SERVER ONLY. Never import this from a client component.
 *
 * `RESEND_API_KEY` must never reach the browser. Two rules keep it there:
 *
 *   1. This module is only ever imported by server code (a route handler or a
 *      serverless function). Importing it from a `"use client"` file would
 *      bundle it — and the key read — into the client.
 *   2. The variable is NOT named `NEXT_PUBLIC_*`. That prefix is precisely what
 *      tells Next.js to inline a value into the browser bundle, so it must not
 *      be used here.
 *
 * The browser only ever POSTs form fields to your own endpoint. It never sees
 * the key, and never talks to Resend directly — Resend rejects browser origins
 * via CORS anyway.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type Enquiry = {
  name: string;
  email: string;
  budget: string;
  brief: string;
};

export type ValidationResult =
  | { ok: true; value: Enquiry }
  | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 120, email: 200, budget: 60, brief: 5000 } as const;

/**
 * Re-validates on the server. The client checks the same things for fast
 * feedback, but a request can be crafted by hand, so nothing from the browser
 * is trusted here.
 */
export function validateEnquiry(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Malformed request." };
  }

  const raw = input as Record<string, unknown>;
  const str = (key: keyof Enquiry) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const value: Enquiry = {
    name: str("name"),
    email: str("email"),
    budget: str("budget"),
    brief: str("brief"),
  };

  if (!value.name) return { ok: false, error: "Name is required." };
  if (!EMAIL.test(value.email)) return { ok: false, error: "A valid email address is required." };
  if (!value.brief) return { ok: false, error: "Please describe the project." };

  for (const [key, max] of Object.entries(LIMITS) as [keyof Enquiry, number][]) {
    if (value[key].length > max) return { ok: false, error: `${key} is too long.` };
  }

  return { ok: true, value };
}

/** Header injection guard — newlines in a header value can forge extra headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SendResult = { ok: true; id?: string } | { ok: false; error: string };

/**
 * Hands the enquiry to Resend.
 *
 * `from` must be on a domain verified in Resend, otherwise the API rejects it.
 * Use `onboarding@resend.dev` while testing, before the domain is verified.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "Email is not configured." };

  const from = process.env.MAIL_FROM ?? "onboarding@resend.dev";
  const to = process.env.MAIL_TO ?? "hello@incredible.website";

  const text = [
    `Name:   ${enquiry.name}`,
    `Email:  ${enquiry.email}`,
    `Budget: ${enquiry.budget || "—"}`,
    "",
    enquiry.brief,
  ].join("\n");

  const html = `
    <table style="font:15px/1.6 system-ui,sans-serif;color:#111">
      <tr><td style="padding:2px 12px 2px 0;color:#666">Name</td><td>${escapeHtml(enquiry.name)}</td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#666">Email</td><td>${escapeHtml(enquiry.email)}</td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#666">Budget</td><td>${escapeHtml(enquiry.budget || "—")}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #e5e5e5;margin:18px 0">
    <div style="font:15px/1.6 system-ui,sans-serif;color:#111;white-space:pre-wrap">${escapeHtml(enquiry.brief)}</div>
  `.trim();

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying in your mail client goes straight back to the enquirer.
        reply_to: singleLine(enquiry.email),
        subject: singleLine(`New project enquiry — ${enquiry.name}`),
        text,
        html,
      }),
    });

    if (!response.ok) {
      // Log server-side for debugging; never surface provider detail to the browser.
      const detail = await response.text().catch(() => "");
      console.error("Resend rejected the request", response.status, detail);
      return { ok: false, error: "Could not send right now." };
    }

    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (cause) {
    console.error("Resend request failed", cause);
    return { ok: false, error: "Could not send right now." };
  }
}
