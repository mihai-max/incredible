# incredible.website

Marketing site for **incredible.website**, a web design studio.

Next.js 16 (App Router) + TypeScript, exported as a static site. No CSS
framework and no runtime dependencies beyond React.

```
app/
  layout.tsx          html shell, metadata, no-JS fallback
  page.tsx            composes the studio site
  globals.css         design tokens + all studio styles
  robots.ts           generated robots.txt
  sitemap.ts          generated sitemap.xml
  demos/
    acme-cloud/       demo: SaaS product site
    acme-supply/      demo: e-commerce storefront
    acme-bistro/      demo: restaurant / local business
components/           one component per section
lib/
  content.ts          all studio copy as typed data
  stagger.ts          reveal-delay helper
public/CNAME          custom domain for GitHub Pages
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

The whole export — studio site plus all three demos — is ~232 KB gzipped
including every JS, CSS, and HTML file.

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

## Demo builds

The studio site has no invented clients, case studies, testimonials, or
performance metrics. Instead, `/demos` holds three finished pages a visitor can
actually click into — built for a fictional "ACME" company with lorem ipsum copy:

| Route | Register |
| --- | --- |
| `/demos/acme-cloud/` | Light B2B SaaS — cool indigo, feature grid, pricing table, UI mock |
| `/demos/acme-supply/` | E-commerce — warm paper stock, oversized serif, product grid |
| `/demos/acme-bistro/` | Restaurant — deep green and brass, menu, hours, booking |

Each demo carries its own CSS Module and shares nothing with the studio
stylesheet, so the three look genuinely unlike each other and unlike the studio
site. That is the point: they demonstrate range, not a single template recoloured.

`DemoChrome` pins a bar to the top of every demo stating that the company is
fictional and the copy is placeholder, with a link back to the studio site. The
demo pages are also `noindex` (see each page's `metadata.robots`) and are kept
out of `sitemap.ts`, so lorem ipsum pages never compete with the real site in
search results.

To add a demo: create `app/demos/<slug>/page.tsx` and `page.module.css`, then add
an entry to `demos` in `lib/content.ts`. The work section picks it up
automatically. Thumbnail palettes live in `globals.css` under `.work__art--N`.

## Before this goes live

Two things still need your input:

- **Contact details** — `site` in `lib/content.ts` holds the email, phone, and
  Munich location. The email `hello@incredible.website` needs a real mailbox.
- **Form delivery** — see below.

The `services`, `steps`, and `faqs` entries in `lib/content.ts` describe how you
work. They're written as sensible defaults, not facts about your business —
read them through and adjust anything that isn't true (the FAQ mentions a two-
to-three-week lead time and a fixed-price model, for instance).

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
