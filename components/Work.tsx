import Eyebrow from "./Eyebrow";
import { projects } from "@/lib/content";
import { staggerDelay } from "@/lib/stagger";

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="glow glow--left" aria-hidden="true" />
      <div className="shell">
        <header className="section__head">
          <Eyebrow num="01">Selected work</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Click through, don&apos;t take our word.
          </h2>
          <p className="section__lede" data-reveal="" data-reveal-delay={2}>
            Sites we&apos;ve built and shipped. Open them, click around, and judge the work for
            yourself.
          </p>
        </header>

        <div className="work-grid">
          {projects.map((project, i) => (
            <article
              className="work"
              key={project.url}
              data-reveal=""
              data-reveal-delay={staggerDelay(i)}
            >
              <a
                className="work__link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`work__art work__art--${i + 1}`} aria-hidden="true">
                  <span className="work__ghost">{project.initials}</span>
                </div>
                <div className="work__meta">
                  <h3>{project.name}</h3>
                  <p className="work__tag">{project.kind}</p>
                </div>
                <p className="work__note">{project.summary}</p>
                <p className="work__cta">
                  Visit site
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
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
