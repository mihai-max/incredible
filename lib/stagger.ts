import type { RevealDelay } from "@/components/Reveal";

/**
 * Reveal delay for the nth item in a group.
 *
 * The first item has no delay; the rest step through the three delay classes
 * defined in globals.css, holding at the last one so long lists stay snappy.
 */
export function staggerDelay(index: number): RevealDelay | undefined {
  if (index <= 0) return undefined;
  return Math.min(index, 3) as RevealDelay;
}
