import Eyebrow from "./Eyebrow";
import { faqs } from "@/lib/content";

/** Native <details> — works with JavaScript disabled. */
export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="shell shell--narrow">
        <header className="section__head">
          <Eyebrow num="04">Questions</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Before you write to us.
          </h2>
        </header>

        <div className="faq" data-reveal="" data-reveal-delay={2}>
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q}
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
