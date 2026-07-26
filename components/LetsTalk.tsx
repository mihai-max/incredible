/** Replaces the pricing table: scope varies, so the answer is a conversation. */
export default function LetsTalk() {
  return (
    <section className="cta-band">
      <div className="glow glow--center" aria-hidden="true" />
      <div className="shell shell--narrow">
        <p className="cta-band__label" data-reveal="">
          No price list
        </p>
        <h2 className="cta-band__title" data-reveal="" data-reveal-delay={1}>
          Let&apos;s talk.
        </h2>
        <p className="cta-band__lede" data-reveal="" data-reveal-delay={2}>
          Every project is scoped differently, so a table of tiers would only be a guess. Tell us
          what you need and you&apos;ll get a fixed price against a fixed scope.
        </p>
        <div className="cta-band__actions" data-reveal="" data-reveal-delay={3}>
          <a className="btn btn--cream" href="#contact">
            Start the conversation
          </a>
        </div>
      </div>
    </section>
  );
}
