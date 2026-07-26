import type { Metadata } from "next";
import DemoChrome from "@/components/DemoChrome";
import SmoothScroll from "@/components/SmoothScroll";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ACME Cloud — demo build | incredible.website",
  description:
    "A demo SaaS product site built by incredible.website. ACME Cloud is a fictional company.",
  robots: { index: false, follow: true },
};

const features = [
  {
    title: "Build pipelines",
    body: "Every push builds in a clean container and caches what it can, then shows you exactly which step cost the most time.",
  },
  {
    title: "Autoscaling",
    body: "Traffic doubles at nine and halves by midnight. Capacity follows it, and you pay for what actually ran.",
  },
  {
    title: "Observability",
    body: "Traces, logs, and metrics land on one timeline, so you stop stitching three tabs together to answer one question.",
  },
  {
    title: "Traffic routing",
    body: "Split by region, header, or percentage. Move a release into production gradually and roll it back in one click.",
  },
  {
    title: "Edge cache",
    body: "Cacheable responses are served from whichever of our 180 locations is closest, and purged the moment you deploy.",
  },
  {
    title: "Audit logs",
    body: "Every configuration change is recorded with who made it, when, and what it replaced. Exportable for review.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "€0",
    unit: "forever",
    blurb: "For prototypes and side projects that need somewhere real to live.",
    items: ["3 projects", "1 GB storage", "Community support"],
  },
  {
    name: "Team",
    price: "€49",
    unit: "per month",
    blurb: "For teams shipping to production every week.",
    items: ["Unlimited projects", "100 GB storage", "Priority support", "SSO"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "talk to sales",
    blurb: "For organisations with procurement, compliance, and uptime commitments.",
    items: ["Dedicated cluster", "Custom SLA", "Audit logging", "Onboarding"],
  },
];

export default function AcmeCloud() {
  return (
    <div className={styles.page}>
      <DemoChrome name="ACME Cloud" />

      <header className={styles.header}>
        <a className={styles.logo} href="#main">
          <span className={styles.logoMark} aria-hidden="true" />
          ACME Cloud
        </a>
        <nav className={styles.nav} aria-label="Demo navigation">
          <a href="#features">Product</a>
          <a href="#plans">Pricing</a>
          <a href="#faq">Docs</a>
        </nav>
        <a className={styles.headerCta} href="#plans">
          Get started
        </a>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <p className={styles.kicker}>Developer infrastructure</p>
          <h1 className={styles.heroTitle}>
            Ship your infrastructure <em>without the yak shaving</em>
          </h1>
          <p className={styles.heroSub}>
            Build pipelines, autoscaling, and observability behind one control plane. Connect a
            repository and your first environment is live in under three minutes.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.btnPrimary} href="#plans">
              Start free
            </a>
            <a className={styles.btnGhost} href="#features">
              See the product
            </a>
          </div>

          <div className={styles.mock} aria-hidden="true">
            <div className={styles.mockBar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockSide}>
                <i /> <i /> <i /> <i /> <i />
              </div>
              <div className={styles.mockMain}>
                <div className={styles.mockChart}>
                  {[38, 62, 45, 78, 55, 88, 70, 96].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className={styles.mockRows}>
                  <i /> <i /> <i />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features} id="features">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Features</p>
            <h2>Everything you need to run in production</h2>
            <p className={styles.lede}>
              One platform for building, deploying, scaling, and watching your services — instead of
              six tools glued together with scripts nobody wants to own.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article className={styles.feature} key={feature.title}>
                <span className={styles.featureIcon} aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.plans} id="plans">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Pricing</p>
            <h2>Straightforward pricing</h2>
          </div>

          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article
                className={`${styles.plan} ${plan.featured ? styles.planFeatured : ""}`}
                key={plan.name}
              >
                {plan.featured ? <span className={styles.planBadge}>Most popular</span> : null}
                <h3>{plan.name}</h3>
                <p className={styles.planPrice}>
                  {plan.price} <span>{plan.unit}</span>
                </p>
                <p className={styles.planBlurb}>{plan.blurb}</p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className={plan.featured ? styles.btnPrimary : styles.btnGhost}
                  href="#plans"
                >
                  Choose {plan.name}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.closer} id="faq">
          <h2>Ready to deploy?</h2>
          <p>
            Create an account and connect a repository. The free tier doesn&apos;t expire, and it
            doesn&apos;t ask for a card.
          </p>
          <a className={styles.btnPrimary} href="#plans">
            Create an account
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 ACME Cloud — a fictional company.</p>
        <p>Demo build by incredible.website</p>
      </footer>
      <SmoothScroll offset={60} />
    </div>
  );
}
