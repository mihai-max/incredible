/**
 * SERVER ONLY. Best-effort in-memory rate limiting.
 *
 * Honest about what this is: serverless instances are ephemeral and there may
 * be several running at once, so a determined flood can get more through than
 * the limit suggests. It costs nothing, needs no extra service, and stops the
 * common case of one script hammering the endpoint.
 *
 * If abuse becomes real, move this to a shared store — Upstash Redis or Vercel
 * KV — so the count is global rather than per-instance.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now: number = Date.now()): { allowed: boolean; retryAfter: number } {
  const cutoff = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);

  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => t <= cutoff)) hits.delete(k);
    }
  }

  return { allowed: true, retryAfter: 0 };
}

/** Vercel sets x-forwarded-for; fall back to a constant so limiting still applies. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
