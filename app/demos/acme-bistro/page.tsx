import type { Metadata } from "next";
import DemoChrome from "@/components/DemoChrome";
import SmoothScroll from "@/components/SmoothScroll";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ACME Bistro — demo build | incredible.website",
  description:
    "A demo restaurant site built by incredible.website. ACME Bistro is a fictional restaurant.",
  robots: { index: false, follow: true },
};

const menu = [
  {
    course: "To start",
    dishes: [
      { name: "Celeriac velouté", desc: "Brown butter, toasted hazelnut, chervil", price: "12" },
      { name: "Beef tartare", desc: "Cured egg yolk, sourdough, capers", price: "16" },
      { name: "Burrata", desc: "Heritage tomato, basil oil, sea salt", price: "14" },
    ],
  },
  {
    course: "Mains",
    dishes: [
      { name: "Roast duck breast", desc: "Cherry, turnip, sauce bigarade", price: "29" },
      { name: "Line-caught cod", desc: "Fennel, mussel broth, dill", price: "26" },
      { name: "Wild mushroom risotto", desc: "Aged parmesan, thyme, brown butter", price: "22" },
    ],
  },
  {
    course: "To finish",
    dishes: [
      { name: "Dark chocolate tart", desc: "Sea salt, crème fraîche", price: "11" },
      { name: "Blood orange sorbet", desc: "Campari, candied peel", price: "9" },
    ],
  },
];

const hours = [
  { day: "Tuesday – Thursday", time: "18:00 – 23:00" },
  { day: "Friday – Saturday", time: "17:30 – 00:00" },
  { day: "Sunday", time: "12:00 – 16:00" },
  { day: "Monday", time: "Closed" },
];

export default function AcmeBistro() {
  return (
    <div className={styles.page}>
      <DemoChrome name="ACME Bistro" />

      <header className={styles.header}>
        <a className={styles.logo} href="#main">
          ACME <span>Bistro</span>
        </a>
        <nav className={styles.nav} aria-label="Demo navigation">
          <a href="#menu">Menu</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className={styles.book} href="#visit">
          Book a table
        </a>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Neighbourhood kitchen · est. mmxix</p>
            <h1>
              Small plates,
              <br />
              <em>long evenings</em>
            </h1>
            <p className={styles.heroSub}>
              A short menu that changes with the market, a long wine list, and no hurry to turn the
              table. Two minutes from Sendlinger Tor.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btn} href="#visit">
                Reserve a table
              </a>
              <a className={styles.btnGhost} href="#menu">
                View the menu
              </a>
            </div>
          </div>
        </section>

        <section className={styles.menu} id="menu">
          <div className={styles.menuHead}>
            <p className={styles.kicker}>The menu</p>
            <h2>Changes with the market</h2>
          </div>

          <div className={styles.courses}>
            {menu.map((course) => (
              <div className={styles.course} key={course.course}>
                <h3>{course.course}</h3>
                <ul>
                  {course.dishes.map((dish) => (
                    <li key={dish.name}>
                      <div className={styles.dishLine}>
                        <span className={styles.dishName}>{dish.name}</span>
                        <span className={styles.dots} aria-hidden="true" />
                        <span className={styles.dishPrice}>{dish.price}</span>
                      </div>
                      <p className={styles.dishDesc}>{dish.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.visit} id="visit">
          <div className={styles.visitCopy}>
            <p className={styles.kicker}>Visit</p>
            <h2>Find us</h2>
            <address className={styles.address}>
              Musterstraße 14
              <br />
              80331 München
              <br />
              Germany
            </address>
            <a className={styles.btn} href="#visit">
              Reserve a table
            </a>
          </div>

          <div className={styles.hours}>
            <h3>Opening hours</h3>
            <dl>
              {hours.map((row) => (
                <div className={styles.hoursRow} key={row.day}>
                  <dt>{row.day}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 ACME Bistro — a fictional restaurant.</p>
        <p>Demo build by incredible.website</p>
      </footer>
      <SmoothScroll offset={60} />
    </div>
  );
}
