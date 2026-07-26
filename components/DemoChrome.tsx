import Link from "next/link";
import styles from "./DemoChrome.module.css";

/**
 * Bar pinned to the top of every demo page.
 *
 * Demos use invented brands and placeholder copy, so this states that plainly
 * and gives a way back to the studio site. It sits above each demo's own header.
 */
export default function DemoChrome({ name }: { name: string }) {
  return (
    <div className={styles.bar}>
      <p className={styles.note}>
        <span className={styles.dot} aria-hidden="true" />
        <strong>Demo</strong>
        <span className={styles.divider} aria-hidden="true" />
        {name} is a fictional company. All copy is placeholder.
      </p>
      <Link className={styles.back} href="/#work">
        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
          <path
            d="M13 8H4M7.5 4l-4 4 4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to incredible.website
      </Link>
    </div>
  );
}
