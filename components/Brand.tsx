import { site } from "@/lib/content";

/** Logo chip — used in both the nav and the footer. */
export default function Brand() {
  return (
    <a className="nav__brand" href="#top" aria-label={`${site.name} — home`}>
      <span className="nav__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 4.5 20 19.5H4z" fill="currentColor" />
        </svg>
      </span>
      <span className="nav__wordmark">
        incredible<span>.website</span>
      </span>
    </a>
  );
}
