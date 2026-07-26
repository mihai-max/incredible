# incredible.website

Marketing site for **incredible.website**, a web design studio.

Next.js 16 (App Router) + TypeScript, exported as a static site. No CSS
framework and no runtime dependencies beyond React.

```
app/
  layout.tsx        html shell, metadata, no-JS fallback
  page.tsx          composes the sections
  globals.css       design tokens + all styles
  robots.ts         generated robots.txt
  sitemap.ts        generated sitemap.xml
components/         one component per section
lib/
  content.ts        all site copy as typed data
  stagger.ts        reveal-delay helper
public/CNAME        custom domain for GitHub Pages
```

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run lint
npm run typecheck
```

`npm run build` writes a fully static site to `out/` — plain HTML, CSS, and JS
with no Node server at runtime.

## Architecture

**Content is separated from presentation.** Every headline, price, service, FAQ,
and case study lives in `lib/content.ts` as typed data. The section components
map over it. Editing the site is mostly editing that one file.

**Almost everything is a server component.** Only four pieces ship JavaScript:

| Component | Why it's a client component |
| --- | --- |
| `Nav` | menu state, scroll condensing, scrollspy |
| `ContactForm` | form state and validation |
| `Reveal` | the IntersectionObserver that fades sections in |
| `HeroParallax` | drifts the hero as you scroll |

`Reveal` and `HeroParallax` deliberately target elements from outside rather
than wrapping them. That keeps the dune SVG and every section server-rendered —
the observer is the only thing in the bundle, and no wrapper elements disturb
the grid layouts.

The whole export is ~208 KB gzipped including all JS, CSS, and HTML.

## Design

Dark, cinematic, ember-accented — a full-bleed dune hero, a floating pill nav,
and a type system pairing a tracked monospace with an editorial serif.

The hero landscape is **inline SVG, not a photograph** (`components/DuneScene.tsx`):
layered gradients, curved dune paths, a blurred sun bloom, and an `feTurbulence`
grain overlay. Nothing to download, no licensing, and it stays sharp at any
viewport.

Styles are one global stylesheet rather than CSS Modules. The class names are
already BEM-namespaced (`.work__meta`, `.tier--featured`), so modules would add
indirection without preventing any collisions, and the token block at the top of
`globals.css` is easier to reason about in one place:

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#050505` | page background |
| `--ink` | `#f6f3ec` | body text |
| `--ember` | `#ff5c1a` | accent, numbering, rules |
| `--cream` | `#f7f3e8` | primary buttons |

Change the accent everywhere by editing `--ember` / `--ember-warm`.

Type uses system font stacks, so there are no webfont requests and no flash of
unstyled text. To switch to a licensed display face, use `next/font` and point
`--font-serif` / `--font-mono` at the generated CSS variables.

## Before this goes live

Some content is placeholder and needs real values — all of it in `lib/content.ts`:

- **Contact details** — `hello@incredible.website`, the phone number, and the
  Austin location.
- **Client names and case studies** — `clients`, `projects`, and `testimonial`
  are illustrative. Replace them with real projects and a real, attributable
  quote before publishing.
- **Stats** — the `stats` figures ("60+ sites shipped").
- **Pricing** — the three `tiers`.
- **Form delivery** — see below.

### Contact form

`ContactForm` validates, then opens the visitor's mail client via a `mailto:`
link. That works with no backend, but it depends on the visitor having a mail
client configured, so it will lose some enquiries.

For real submissions, point it at a form service. In
`components/ContactForm.tsx`, replace the `window.location.href = "mailto:..."`
assignment with a POST:

```ts
const res = await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify(fields),
});

setStatus(
  res.ok
    ? "Thanks — we'll reply within a business day."
    : `Something went wrong. Email ${site.email} instead.`,
);
if (res.ok) setFields(empty);
```

Make `handleSubmit` `async` and wrap that in `try`/`catch` so a network failure
still shows the fallback message.

## Deploying to incredible.website

GitHub Pages cannot build Next.js from source, so `.github/workflows/deploy.yml`
runs lint, typecheck, and build, then publishes `out/`. It triggers on pushes to
`main` and can be run manually.

1. **Settings → Pages**, set **Source** to **GitHub Actions** (not "Deploy from
   a branch").
2. Point DNS at GitHub. For the apex domain, four `A` records:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   and the matching `AAAA` records:

   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

   Add a `CNAME` record for `www` → `<username>.github.io`.

   These are GitHub's published Pages addresses — worth checking them against
   [the current docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
   when you set it up, since they can change.
3. Once DNS resolves, tick **Enforce HTTPS** in Settings → Pages.

`public/CNAME` is copied into `out/` on every build, so the custom domain
survives redeploys.

Netlify, Vercel, and Cloudflare Pages also work — build command `npm run build`,
publish directory `out`. On Vercel you can drop `output: "export"` from
`next.config.ts` to get server rendering instead.

## Accessibility & performance

- Semantic landmarks, a skip link, and visible focus rings throughout.
- The mobile menu manages `aria-expanded` and closes on `Escape`.
- The FAQ uses native `<details>`, so it works without JavaScript.
- `prefers-reduced-motion` disables the reveals, marquee, and hero parallax.
- A `<noscript>` rule in `layout.tsx` makes every section visible when
  JavaScript is unavailable, since reveals start at `opacity: 0`.

Verified in Chromium: no console errors, no horizontal overflow from 320px to
1920px, one `h1` with correctly ordered headings, every form field labelled, no
broken in-page anchors, and full content visible both under
`prefers-reduced-motion` and with JavaScript disabled.

### A note on `npm audit`

`npm audit` reports advisories in `postcss` and `sharp`. Both are transitive
build-time dependencies of Next itself — neither is shipped to the browser, and
`sharp` isn't used at all in a static export. `npm audit fix --force` "resolves"
them by downgrading to Next 9, which is not a fix. Leave them until Next bumps
its own dependencies.
