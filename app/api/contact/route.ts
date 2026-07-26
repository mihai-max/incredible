import { sendEnquiry, validateEnquiry } from "@/lib/enquiry";
import { clientKey, rateLimit } from "@/lib/rateLimit";

/** Needs the Node runtime for process.env access to the Resend key. */
export const runtime = "nodejs";

/** Never cached — every submission must reach the handler. */
export const dynamic = "force-dynamic";

/**
 * Minimal HTML reply for submissions that arrive without JavaScript.
 *
 * The form carries method="post" action="/api/contact/", so if the bundle fails
 * to load the browser still posts here properly. Without that, a form with no
 * action falls back to GET against the current page — which serialises the
 * visitor's message into the query string and loses it.
 */
function htmlReply(title: string, message: string, status: number) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — incredible.website</title>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#050505;color:#f6f3ec;font:16px/1.6 system-ui,sans-serif;text-align:center;padding:2rem">
<div><h1 style="font-weight:400;font-size:1.6rem;margin:0 0 .75rem">${title}</h1>
<p style="margin:0 0 1.75rem;color:#b8b3a9;max-width:42ch">${message}</p>
<a href="/" style="display:inline-block;padding:.85rem 1.75rem;border-radius:999px;background:#f7f3e8;color:#14100c;text-decoration:none">Back to the site</a></div>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  // A form post without JS sends urlencoded data and expects a page back.
  const isFormPost = (request.headers.get("content-type") ?? "").includes(
    "application/x-www-form-urlencoded",
  );

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    const message = "Too many enquiries from this address. Please try again shortly.";
    return isFormPost
      ? htmlReply("Slow down a moment", message, 429)
      : Response.json({ error: message }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  }

  let payload: unknown;
  try {
    payload = isFormPost
      ? Object.fromEntries(await request.formData())
      : await request.json();
  } catch {
    return isFormPost
      ? htmlReply("Something went wrong", "We couldn't read that submission.", 400)
      : Response.json({ error: "Malformed request." }, { status: 400 });
  }

  /*
    Server-side honeypot. The browser checks this too, but a bot posting
    straight at the endpoint skips the page entirely — so it is re-checked
    here, where it cannot be bypassed.

    Answered with 200 rather than an error: a bot that learns it was caught
    adapts, and there is no real visitor to inform.
  */
  const honeypot = (payload as Record<string, unknown> | null)?.["company-website"];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return isFormPost
      ? htmlReply("Thanks", "Your enquiry is with us.", 200)
      : Response.json({ ok: true });
  }

  const validated = validateEnquiry(payload);
  if (!validated.ok) {
    return isFormPost
      ? htmlReply("Check that again", validated.error, 400)
      : Response.json({ error: validated.error }, { status: 400 });
  }

  const sent = await sendEnquiry(validated.value);
  if (!sent.ok) {
    // sendEnquiry already logged the provider's response server-side.
    const message = `Could not send that. Please email ${process.env.MAIL_TO ?? "us"} directly.`;
    return isFormPost
      ? htmlReply("Something went wrong", message, 502)
      : Response.json({ error: sent.error }, { status: 502 });
  }

  return isFormPost
    ? htmlReply("Thanks — that's with us", "We'll reply within one business day.", 200)
    : Response.json({ ok: true });
}
