import type { Metadata } from "next";
import DemoChrome from "@/components/DemoChrome";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ACME Supply Co. — demo build | incredible.website",
  description:
    "A demo e-commerce storefront built by incredible.website. ACME Supply Co. is fictional and all copy is placeholder.",
  robots: { index: false, follow: true },
};

const products = [
  { name: "Lorem Canvas Tote", price: "€48", tone: "one" },
  { name: "Ipsum Enamel Mug", price: "€22", tone: "two" },
  { name: "Dolor Wool Throw", price: "€135", tone: "three" },
  { name: "Sit Amet Notebook", price: "€18", tone: "four" },
  { name: "Consectetur Apron", price: "€64", tone: "five" },
  { name: "Adipiscing Carafe", price: "€89", tone: "six" },
];

export default function AcmeSupply() {
  return (
    <div className={styles.page}>
      <DemoChrome name="ACME Supply Co." />

      <header className={styles.header}>
        <nav className={styles.navLeft} aria-label="Demo navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Story</a>
        </nav>
        <a className={styles.logo} href="#main">
          ACME
          <span>Supply Co.</span>
        </a>
        <nav className={styles.navRight} aria-label="Demo utilities">
          <a href="#shop">Search</a>
          <a href="#shop">Cart (0)</a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Autumn collection</p>
            <h1>
              Goods made to <em>outlast</em> the season
            </h1>
            <p className={styles.heroSub}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <a className={styles.btn} href="#shop">
              Shop the collection
            </a>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.heroArtInner} />
          </div>
        </section>

        <section className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((set) => (
              <div className={styles.marqueeSet} key={set}>
                <span>Free shipping over €75</span>
                <span>·</span>
                <span>30-day returns</span>
                <span>·</span>
                <span>Made in Europe</span>
                <span>·</span>
                <span>Carbon-neutral delivery</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.shop} id="shop">
          <div className={styles.shopHead}>
            <h2>The collection</h2>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>

          <div className={styles.grid}>
            {products.map((product) => (
              <article className={styles.product} key={product.name}>
                <div
                  className={`${styles.thumb} ${styles[product.tone]}`}
                  aria-hidden="true"
                />
                <div className={styles.productMeta}>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>{product.price}</p>
                </div>
                <button className={styles.add} type="button">
                  Add to bag
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.story} id="story">
          <div className={styles.storyArt} aria-hidden="true" />
          <div className={styles.storyCopy}>
            <p className={styles.kicker}>Our story</p>
            <h2>Slow goods, dolor sit amet</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
            <p>
              Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem.
            </p>
            <a className={styles.btnGhost} href="#shop">
              Read more
            </a>
          </div>
        </section>

        <section className={styles.signup}>
          <h2>Join the list</h2>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur — one letter a month.</p>
          <form className={styles.form} action="#shop">
            <label className={styles.srOnly} htmlFor="supply-email">
              Email address
            </label>
            <input id="supply-email" type="email" placeholder="you@example.com" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 ACME Supply Co. — a fictional company.</p>
        <p>Demo build by incredible.website</p>
      </footer>
    </div>
  );
}
