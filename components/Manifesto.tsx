import { stats } from "@/lib/content";

export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="shell">
        <p className="statement" data-reveal="">
          Most websites are a pile of decisions nobody made on purpose.{" "}
          <span>We make every one of them on purpose</span> — the first frame, the fifth scroll, the
          sentence that finally gets the click.
        </p>

        <div className="stats" data-reveal="" data-reveal-delay={1}>
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
