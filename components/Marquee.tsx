import { clients } from "@/lib/content";

/**
 * Infinite client strip. The track holds two identical sets and slides by
 * exactly -50%, so the loop is seamless. The second set is decorative.
 */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Selected clients">
      <div className="marquee__track">
        {[false, true].map((duplicate) => (
          <div
            className="marquee__set"
            key={duplicate ? "duplicate" : "original"}
            aria-hidden={duplicate || undefined}
          >
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
