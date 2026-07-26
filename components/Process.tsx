import Eyebrow from "./Eyebrow";
import { steps } from "@/lib/content";
import { staggerDelay } from "@/lib/stagger";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="shell">
        <header className="section__head">
          <Eyebrow num="03">Process</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Six weeks, no fog.
          </h2>
          <p className="section__lede" data-reveal="" data-reveal-delay={2}>
            You always know what&apos;s happening, what&apos;s next, and what we need from you.
          </p>
        </header>

        <ol className="steps">
          {steps.map((step, i) => (
            <li className="step" key={step.title} data-reveal="" data-reveal-delay={staggerDelay(i)}>
              <span className="step__num">{step.when}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
