import Link from "next/link";
import Eyebrow from "./Eyebrow";
import { demos } from "@/lib/content";
import { staggerDelay } from "@/lib/stagger";

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="glow glow--left" aria-hidden="true" />
      <div className="shell">
        <header className="section__head">
          <Eyebrow num="01">Demo builds</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Click through, don&apos;t take our word.
          </h2>
          <p className="section__lede" data-reveal="" data-reveal-delay={2}>
            Three finished pages for a fictional company, each built in a different register. The
            businesses are invented — the design and the code are not.
          </p>
        </header>

        <div className="work-grid">
          {demos.map((demo, i) => (
            <article
              className="work"
              key={demo.slug}
              data-reveal=""
              data-reveal-delay={staggerDelay(i)}
            >
              <Link className="work__link" href={`/demos/${demo.slug}/`}>
                <div className={`work__art work__art--${i + 1}`} aria-hidden="true">
                  <span className="work__ghost">{demo.initials}</span>
                </div>
                <div className="work__meta">
                  <h3>{demo.name}</h3>
                  <p className="work__tag">{demo.kind}</p>
                </div>
                <p className="work__note">{demo.summary}</p>
                <p className="work__cta">
                  View demo
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path
                      d="M3 8h9M8.5 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
