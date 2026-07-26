import Eyebrow from "./Eyebrow";
import ContactForm from "./ContactForm";
import { site } from "@/lib/content";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="glow glow--contact" aria-hidden="true" />
      <div className="shell">
        <div className="contact__grid">
          <div className="contact__intro">
            <Eyebrow num="06">Start a project</Eyebrow>

            <h2 className="contact__title" data-reveal="" data-reveal-delay={1}>
              Tell us what you&apos;re
              <br />
              <em>actually</em> trying to do.
            </h2>

            <p className="contact__lede" data-reveal="" data-reveal-delay={2}>
              A paragraph is plenty. We reply to every enquiry within one business day — with a
              straight answer about fit, timing, and cost.
            </p>

            <ul className="contact__direct" data-reveal="" data-reveal-delay={3}>
              <li>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span>Studio</span>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <span>Where</span>
                {site.location}
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
