import { testimonial } from "@/lib/content";

export default function Quote() {
  return (
    <section className="quote-band">
      <div className="glow glow--center" aria-hidden="true" />
      <div className="shell shell--narrow">
        <blockquote data-reveal="">
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
          <footer>
            <span className="quote-band__name">{testimonial.name}</span>
            <span className="quote-band__role">{testimonial.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
