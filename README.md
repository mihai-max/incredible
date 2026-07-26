# incredible.website

Marketing site for **incredible.website**, a web design studio.

Static HTML, CSS, and vanilla JS — no build step, no dependencies, no framework.
Open `index.html` in a browser and it runs.

```
index.html            the whole page
assets/css/style.css  design tokens + all styles
assets/js/main.js     nav, scroll reveal, scrollspy, form
CNAME                 custom domain for GitHub Pages
robots.txt            crawler rules
sitemap.xml           single-page sitemap
```

## Run it locally

Any static server works:

```bash
npx http-server -p 8000     # or: python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Design

Dark, cinematic, ember-accented — a full-bleed dune hero, a floating pill nav,
and a type system that pairs a tracked monospace with an editorial serif.

The hero landscape is **inline SVG**, not a photograph: layered gradients, curved
dune paths, a blurred sun bloom, and an `feTurbulence` grain overlay. That keeps
the page dependency-free and fast — nothing to download, and it scales to any
viewport without going soft.

Everything is tokenised at the top of `style.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#050505` | page background |
| `--ink` | `#f6f3ec` | body text |
| `--ember` | `#ff5c1a` | accent, numbering, rules |
| `--cream` | `#f7f3e8` | primary buttons |
| `--font-serif` | system serif | headlines |
| `--font-mono` | system mono | labels, eyebrows, hero |

Change the accent everywhere by editing `--ember` / `--ember-warm`.

Type uses system font stacks, so there are no webfont requests and no flash of
unstyled text. To switch to a licensed display face, set `--font-serif` and
`--font-mono` and add the `@font-face` rules.

## Before this goes live

A few things are placeholders and need real values:

- **Contact details** — `hello@incredible.website`, the phone number, and the
  Austin location in the contact section of `index.html`.
- **Client names and case studies** — the work cards, the logo marquee, and the
  testimonial are illustrative. Replace them with real projects and a real,
  attributable quote before publishing.
- **Stats** — the "60+ sites shipped" figures in the manifesto block.
- **Pricing** — the three tiers in the pricing section.
- **Form delivery** — see below.

### Contact form

The form validates client-side and then opens the visitor's mail client via a
`mailto:` link. That works with no backend, but it depends on the visitor having
a mail client configured, so it will lose some enquiries.

For real submissions, point it at a form service. In `assets/js/main.js`, replace
the `window.location.href = "mailto:..."` block with a POST:

```js
fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({
    name: name.value.trim(),
    email: email.value.trim(),
    budget: budget.value,
    brief: brief.value.trim()
  })
})
  .then(function (r) {
    status.textContent = r.ok
      ? "Thanks — we'll reply within a business day."
      : "Something went wrong. Email hello@incredible.website instead.";
    if (r.ok) form.reset();
  })
  .catch(function () {
    status.textContent = "Something went wrong. Email hello@incredible.website instead.";
  });
```

## Deploying to incredible.website

`CNAME` is already set to the apex domain, so GitHub Pages will pick it up.

1. **Settings → Pages**, set the source to this branch, root folder.
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
3. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.

Netlify, Vercel, and Cloudflare Pages also work with zero configuration — point
them at the repo, no build command, publish directory `/`.

## Accessibility & performance

- Semantic landmarks, a skip link, and visible focus rings throughout.
- The mobile menu manages `aria-expanded` and closes on `Escape`.
- The FAQ uses native `<details>`, so it works without JavaScript.
- `prefers-reduced-motion` disables the reveals, marquee, and hero parallax.
- With JS disabled you still get the entire page — only the reveal animations
  and client-side validation are lost.
