import DuneScene from "./DuneScene";
import HeroParallax from "./HeroParallax";
import Eyebrow from "./Eyebrow";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__scene" aria-hidden="true">
        <DuneScene />
        <div className="hero__vignette" />
      </div>
      <HeroParallax />

      <div className="hero__content shell">
        <Eyebrow>Web design studio · est. 2025</Eyebrow>

        <h1 className="hero__title" data-reveal="" data-reveal-delay={1}>
          <span className="hero__title-line">FIND CLARITY IN</span>
          <span className="hero__title-line">
            A CROWDED <em>web</em>
          </span>
        </h1>

        <p className="hero__sub" data-reveal="" data-reveal-delay={2}>
          We design and build cinematic, fast, conversion-focused websites — turning scattered
          brand, copy, and product into one clear direction your customers act on.
        </p>

        <div className="hero__actions" data-reveal="" data-reveal-delay={3}>
          <a className="btn btn--cream" href="#contact">
            Book a call
          </a>
          <a className="btn btn--ghost" href="#work">
            See the work
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#work" aria-label="Scroll to work">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>SCROLL</span>
      </a>
    </section>
  );
}
