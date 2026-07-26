import Eyebrow from "./Eyebrow";
import { tiers } from "@/lib/content";
import { staggerDelay } from "@/lib/stagger";

export default function Pricing() {
  return (
    <section className="section section--alt" id="pricing">
      <div className="shell">
        <header className="section__head">
          <Eyebrow num="04">Engagements</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Clear scope, clear number.
          </h2>
          <p className="section__lede" data-reveal="" data-reveal-delay={2}>
            Fixed-price projects. No hourly billing, no surprise invoices.
          </p>
        </header>

        <div className="tiers">
          {tiers.map((tier, i) => (
            <article
              className={`tier${tier.featured ? " tier--featured" : ""}`}
              key={tier.name}
              data-reveal=""
              data-reveal-delay={staggerDelay(i)}
            >
              {tier.badge ? <span className="tier__badge">{tier.badge}</span> : null}
              <h3>{tier.name}</h3>
              <p className="tier__price">
                {tier.price}
                <span>{tier.unit}</span>
              </p>
              <p className="tier__desc">{tier.desc}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={`btn btn--block ${tier.featured ? "btn--cream" : "btn--ghost"}`}
                href="#contact"
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
