# incredible.website

Marketing site for **incredible.website**, a web design studio.

Next.js 16 (App Router) + TypeScript. No CSS framework and no runtime
dependencies beyond React. The contact form posts to a server route that sends
mail through Resend, so this needs a Node host — it is no longer a static
export.

```
app/
  layout.tsx          html shell, metadata, no-JS fallback
  page.tsx            composes the studio site
  globals.css         design tokens + all studio styles
  robots.ts           generated robots.txt
  sitemap.ts          generated sitemap.xml
  api/contact/        POST endpoint — validates, screens, sends via Resend
  demos/
    acme-cloud/       demo: SaaS product site
    acme-supply/      demo: e-commerce storefront
    acme-bistro/      demo: restaurant / local business
components/           one component per section
lib/
  content.ts          all studio copy as typed data
  enquiry.ts          SERVER ONLY — validation + the Resend call
  humanCheck.ts       bot heuristics and the challenge
  rateLimit.ts        SERVER ONLY — best-effort per-IP limiting
  stagger.ts          reveal-delay helper
.env.example          the variables you need to set
```

## Commands

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev                  # http://localhost:3000
npm run build
npm start                    # production server
npm run lint
npm run typecheck
```

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

The client bundle — studio site plus all three demos — is ~233 KB gzipped.

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

### Spam screening

The form screens for bots invisibly first, and only shows a challenge if those
checks don't clear it. Logic lives in `lib/humanCheck.ts`.

Invisible, in order:

1. **Honeypot** — a `Company website` field positioned off-screen (not
   `display: none`, which naive bots skip), `tabindex="-1"` and inside an
   `aria-hidden` wrapper so no visitor or screen reader ever meets it. Bots fill
   it; people can't.
2. **Interaction** — has any `pointerdown`, `pointermove`, `keydown`, or
   `touchstart` been seen? Scripted submissions produce none.
3. **Timing** — submissions less than `MIN_FILL_MS` (2.5s) after the form
   mounted. This is measured from page load, so it is lenient by design and
   really only catches load-and-submit bots.

**A failed check never rejects the submission — it escalates to the challenge.**
That rule is the important one: a false positive should cost someone one extra
step, never a lost enquiry. The challenge is arithmetic ("what is 3 + 9?")
rather than an image or audio puzzle, so it works with a screen reader, on a
keyboard, without colour vision, and adds nothing to the page weight. A wrong
answer re-rolls the question and does not send.

Field validation still runs before any of this, so a visitor never gets a
challenge on a submission that was going to fail anyway.

**Server-side too.** The honeypot is re-checked in `app/api/contact/route.ts`,
where it cannot be bypassed — a bot posting straight at the endpoint never loads
the page, so the browser-side checks mean nothing to it. That request is answered
`200` rather than an error: a bot that learns it was caught adapts, and there is
no real visitor to inform. The endpoint also rate-limits per IP (5 per 10
minutes, best-effort — see `lib/rateLimit.ts` for why "best-effort").

**What this still is not.** The invisible checks and the challenge run in the
browser and are readable by anyone who looks. They stop naive form-filling bots,
which is most of what a small site sees. For a stronger guarantee, add
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) and verify
its token inside the route handler — the server side now exists to do that.

### Contact form

`ContactForm` validates, screens as above, then opens the visitor's mail client
via a `mailto:` link. That works with no backend, but it depends on the visitor having a mail
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

## Sending mail

The form POSTs to `/api/contact/`, which validates, screens for bots, and calls
Resend. **The API key never reaches the browser** — two things keep it there:

- `lib/enquiry.ts` is imported only by server code. Importing it from a
  `"use client"` file would bundle the key read into the browser.
- The variable is `RESEND_API_KEY`, deliberately **not** `NEXT_PUBLIC_*`. That
  prefix is exactly what tells Next.js to inline a value into the client bundle.

The browser only ever posts form fields to our own origin. It never holds the key
and never talks to Resend directly, which would fail CORS regardless.

Set three variables in the host's dashboard (see `.env.example`):

| Variable | Notes |
| --- | --- |
| `RESEND_API_KEY` | From <https://resend.com/api-keys>. Never commit it. |
| `MAIL_FROM` | Must be on a domain verified at <https://resend.com/domains>. Use `onboarding@resend.dev` until `incredible.website` is verified. |
| `MAIL_TO` | Where enquiries land. |

`reply_to` is set to the enquirer, so replying in your mail client goes straight
back to them. Newlines are stripped from header values (header injection) and
every interpolated value is escaped in the HTML body. Resend's error responses
are logged server-side and never echoed to the browser.

### It works without JavaScript

The form carries `method="post" action="/api/contact/"`. That matters more than
it looks: a form with neither falls back to **GET against the current page**,
which serialises the visitor's message into the query string and loses it. With
them, a submission still reaches the endpoint if the bundle fails to load, and
the route replies with a plain HTML confirmation. Both paths are tested.

## Deploying to Vercel

This site can no longer go on GitHub Pages — Pages runs no server code, so
`/api/contact` would 404 and the form would break. (Confirmed rather than
assumed: building with `output: "export"` and a route handler present succeeds,
but never writes `out/api/`.) The Pages workflow and `public/CNAME` have been
removed.

1. Import the repo at <https://vercel.com/new>. Next.js is detected; no build
   configuration needed.
2. **Settings → Environment Variables**, add the three above for Production
   (and Preview, if you want the form working there).
3. **Settings → Domains**, add `incredible.website`, and follow Vercel's DNS
   instructions — an `A` record at the apex, `CNAME` for `www`. Remove the old
   GitHub Pages `A`/`AAAA` records once it resolves.
4. Verify `incredible.website` in Resend so `MAIL_FROM` can use it.

Until DNS moves, GitHub Pages keeps serving whatever it last built, so there is
no outage during the switch.

Netlify and Cloudflare Pages both run Next route handlers too, if you'd rather
use those — same environment variables, same build command.

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
dependencies of Next itself — neither is shipped to the browser. `npm audit fix --force` "resolves" them by
downgrading to Next 9, which is not a fix. Leave them until Next bumps its own
dependencies.
