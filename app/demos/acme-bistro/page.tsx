import type { Metadata } from "next";
import DemoChrome from "@/components/DemoChrome";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ACME Bistro — demo build | incredible.website",
  description:
    "A demo restaurant site built by incredible.website. ACME Bistro is fictional and all copy is placeholder.",
  robots: { index: false, follow: true },
};

const menu = [
  {
    course: "To start",
    dishes: [
      { name: "Lorem ipsum velouté", desc: "Celeriac, brown butter, hazelnut", price: "12" },
      { name: "Dolor sit amet tartare", desc: "Beef, cured yolk, sourdough", price: "16" },
      { name: "Consectetur burrata", desc: "Heritage tomato, basil oil", price: "14" },
    ],
  },
  {
    course: "Mains",
    dishes: [
      { name: "Adipiscing elit duck", desc: "Cherry, turnip, sauce bigarade", price: "29" },
      { name: "Tempor incididunt cod", desc: "Fennel, mussel broth, dill", price: "26" },
      { name: "Labore et dolore risotto", desc: "Wild mushroom, aged parmesan", price: "22" },
    ],
  },
  {
    course: "To finish",
    dishes: [
      { name: "Magna aliqua tart", desc: "Dark chocolate, sea salt, crème fraîche", price: "11" },
      { name: "Veniam quis sorbet", desc: "Blood orange, campari", price: "9" },
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
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
    </div>
  );
}
