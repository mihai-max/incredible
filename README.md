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

**Content is separated from presentation.** Every headline, service, FAQ, and
demo entry lives in `lib/content.ts` as typed data. The section components map
over it. Editing the studio site is mostly editing that one file. (Each demo
keeps its own copy inline, since the three have entirely different shapes.)

**Almost everything is a server component.** Only five pieces ship JavaScript:

| Component | Why it's a client component |
| --- | --- |
| `Nav` | menu state, scroll condensing, scrollspy |
| `ContactForm` | form state and validation |
| `Reveal` | the IntersectionObserver that fades sections in |
| `HeroParallax` | drifts the hero as you scroll |
| `SmoothScroll` | eased in-page scrolling (also used by the demos) |

`Reveal` and `HeroParallax` deliberately target elements from outside rather
than wrapping them. That keeps the dune SVG and every section server-rendered —
the observer is the only thing in the bundle, and no wrapper elements disturb
the grid layouts.

The whole export — studio site plus all three demos — is ~233 KB gzipped
including every JS, CSS, and HTML file.

## Design

Dark, cinematic, ember-accented — a full-bleed dune hero, a floating pill nav,
and a type system pairing a tracked monospace with an editorial serif.

The hero landscape is **inline SVG, not a photograph** (`components/DuneScene.tsx`):
layered gradients, curved dune paths, a blurred sun bloom, and an `feTurbulence`
grain overlay. Nothing to download, no licensing, and it stays sharp at any
viewport.

Styles are one global stylesheet rather than CSS Modules. The class names are
already BEM-namespaced (`.work__meta`, `.cta-band__title`), so modules would add
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

### Motion

Two deliberate pieces of motion:

- **The nav pill travels.** Rather than each link painting its own background on
  hover, a single `.nav__bubble` slides and resizes between them. `Nav.tsx`
  measures the target link's `offsetLeft` and `offsetWidth` and writes them to
  inline styles; the CSS transition does the rest. It follows the pointer while
  hovering and returns to whichever section the scrollspy says you're reading.
  Measuring the real element — rather than hard-coding positions — keeps it
  correct when labels change or fonts render differently.
- **In-page scrolling ramps.** `SmoothScroll.tsx` intercepts anchor clicks and
  animates the scroll on an ease-in-out cubic curve, so it accelerates away and
  settles rather than moving at the constant rate CSS `scroll-behavior: smooth`
  gives you. Duration scales with the square root of the distance, clamped to
  520–1250ms, so a jump to the footer doesn't crawl and a short hop doesn't drag.
  Each `window.scrollTo` passes `behavior: "instant"` so the CSS fallback can't
  fight the animation frame by frame.

**On `prefers-reduced-motion`.** The common
`*, *::before, *::after { transition-duration: 0.01ms !important }` snippet kills
every transition on the page, which makes the UI feel broken rather than calm —
the nav pill teleports and buttons snap. The rule here is targeted instead: the
marquee loop, hero parallax, and reveal slides are switched off, while small
interaction feedback like the nav pill keeps animating. Full-viewport scrolling
*is* large-field motion, so that stays off — flip
`RESPECT_REDUCED_MOTION` in `SmoothScroll.tsx` if you want it eased regardless.

If the eased scroll doesn't appear on your own machine, check whether the OS is
asking for reduced motion:

```js
({
  reduceMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  jsRan: !!document.querySelector('.nav__bubble')?.getAttribute('style'),
})
```

`reduceMotion: true` means the eased scroll is being suppressed on purpose.
`jsRan: false` means the JavaScript never ran at all — check the `basePath`
trap in the deployment section below.

**Windows Server reports reduced motion by default.** Server SKUs ship with
Visual Effects set to *"Adjust for best performance"*, which unchecks "Animate
controls and elements inside windows". That flag is `SPI_GETCLIENTAREAANIMATION`,
which is exactly what Chrome and Edge translate into
`prefers-reduced-motion: reduce` — so a Server desktop suppresses the eased
scroll without anyone having chosen an accessibility setting. It is a
performance default, not a user preference, and it makes a Server desktop a poor
place to judge the site's motion. Turn it on under Ease of Access → Display →
"Show animations in Windows", or via System Properties → Advanced → Performance
→ Settings → Visual Effects.

## Demo builds

The studio site has no invented clients, case studies, testimonials, or
performance metrics. Instead, `/demos` holds three finished pages a visitor can
actually click into — built for a fictional "ACME" company. The businesses are
invented, but the copy is written as real product, shop, and restaurant writing;
there is no lorem ipsum anywhere:

| Route | Register |
| --- | --- |
| `/demos/acme-cloud/` | Light B2B SaaS — cool indigo, feature grid, pricing table, UI mock |
| `/demos/acme-supply/` | E-commerce — warm paper stock, oversized serif, product grid |
| `/demos/acme-bistro/` | Restaurant — deep green and brass, menu, hours, booking |

Each demo carries its own CSS Module and shares nothing with the studio
stylesheet, so the three look genuinely unlike each other and unlike the studio
site. That is the point: they demonstrate range, not a single template recoloured.

`DemoChrome` pins a bar to the top of every demo stating that the company is
fictional, with a link back to the studio site. Because that bar owns the
`top: 0` sticky slot, demo page headers are deliberately static — a second
sticky element at the same offset slides underneath it. The demo pages are also
`noindex` (see each page's `metadata.robots`) and are kept out of `sitemap.ts`,
so invented brands never compete with the real site in search results.

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

GitHub Pages cannot build Next.js from source, so
`.github/workflows/nextjs.yml` builds the site and publishes `out/`. It triggers
on pushes to `claude/web-design-business-site-wzh6lj` and can be run manually
from the Actions tab.

Two things to know about that workflow:

- **It only deploys from that branch.** Merging to `main` will not publish
  anything until you add `main` to its `on.push.branches` list.
- **It sets `static_site_generator: next`,** which lets `configure-pages` inject
  a `basePath` into the Next config automatically. That is correct for a project
  site served from `<user>.github.io/<repo>/`, but wrong for an apex custom
  domain, where the site is served from `/`. Configure the custom domain in
  Settings → Pages *before* the first deploy so Pages reports
  `https://incredible.website/` and no `basePath` is injected. If CSS and JS
  come back 404 on the live site, an injected `basePath` is the first thing to
  check — remove the `static_site_generator` line to opt out.

1. **Settings → Pages**, set **Source** to **GitHub Actions** (not "Deploy from
   a branch"), and set the custom domain to `incredible.website`.
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
