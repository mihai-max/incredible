import Eyebrow from "./Eyebrow";
import { services } from "@/lib/content";
import { staggerDelay } from "@/lib/stagger";

export default function Services() {
  return (
    <section className="section section--alt" id="services">
      <div className="glow glow--right" aria-hidden="true" />
      <div className="shell">
        <header className="section__head">
          <Eyebrow num="02">Services</Eyebrow>
          <h2 className="section__title" data-reveal="" data-reveal-delay={1}>
            Four things, done properly.
          </h2>
        </header>

        <div className="services">
          {services.map((service, i) => (
            <article
              className="service"
              key={service.num}
              data-reveal=""
              data-reveal-delay={staggerDelay(i)}
            >
              <span className="service__num">{service.num}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
