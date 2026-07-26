import type { Metadata } from "next";
import DemoChrome from "@/components/DemoChrome";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ACME Cloud — demo build | incredible.website",
  description:
    "A demo SaaS product site built by incredible.website. ACME Cloud is fictional and all copy is placeholder.",
  robots: { index: false, follow: true },
};

const features = [
  {
    title: "Lorem pipelines",
    body: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Ipsum autoscaling",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Dolor observability",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  },
  {
    title: "Sit amet routing",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
  },
  {
    title: "Elit edge cache",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
  },
  {
    title: "Tempor audit logs",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit consequuntur.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "€0",
    unit: "forever",
    blurb: "Lorem ipsum dolor sit amet, for small teams getting started.",
    items: ["3 projects", "1 GB storage", "Community support"],
  },
  {
    name: "Team",
    price: "€49",
    unit: "per month",
    blurb: "Consectetur adipiscing elit, for teams shipping every week.",
    items: ["Unlimited projects", "100 GB storage", "Priority support", "SSO"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "talk to sales",
    blurb: "Sed do eiusmod tempor, for organisations with compliance needs.",
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
          <p className={styles.kicker}>Lorem ipsum platform</p>
          <h1 className={styles.heroTitle}>
            Ship your infrastructure <em>without the yak shaving</em>
          </h1>
          <p className={styles.heroSub}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua veniam quis nostrud.
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
            <h2>Everything, dolor sit amet</h2>
            <p className={styles.lede}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
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
            <h2>Simple, lorem ipsum pricing</h2>
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
          <h2>Ready to get started?</h2>
          <p>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur.
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
    </div>
  );
}
