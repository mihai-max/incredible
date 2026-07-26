import { stack } from "@/lib/content";

/**
 * Infinite strip of the tools we build with. The track holds two identical
 * sets and slides by exactly -50%, so the loop is seamless. The second set is
 * decorative and hidden from assistive tech.
 */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Tools we build with">
      <div className="marquee__track">
        {[false, true].map((duplicate) => (
          <div
            className="marquee__set"
            key={duplicate ? "duplicate" : "original"}
            aria-hidden={duplicate || undefined}
          >
            {stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
