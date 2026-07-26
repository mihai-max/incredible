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
            Sites that carry their weight.
          </h2>
          <p className="section__lede" data-reveal="" data-reveal-delay={2}>
            A few recent launches. Every one shipped end to end — strategy, design, build, and
            handoff.
          </p>
        </header>

        <div className="work-grid">
          {projects.map((project, i) => (
            <article className="work" key={project.id} data-reveal="" data-reveal-delay={staggerDelay(i)}>
              <div className={`work__art work__art--${i + 1}`} aria-hidden="true">
                <span className="work__ghost">{project.initials}</span>
              </div>
              <div className="work__meta">
                <h3>{project.name}</h3>
                <p className="work__tag">{project.tag}</p>
              </div>
              <p className="work__note">{project.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
