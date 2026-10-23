/**
 * Site copy lives here so the components stay presentational.
 * Editing the site is mostly editing this file.
 */

export const site = {
  name: "incredible.website",
  url: "https://incredible.website",
  tagline: "Web Design Studio",
  description:
    "incredible.website is a web design studio building cinematic, fast, conversion-focused websites for ambitious brands.",
  email: "hello@incredible.website",
  phone: "+49 157 52466163",
  phoneHref: "tel:+4915752466163",
  location: "Munich, Germany · remote worldwide",
  city: "Munich",
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
] as const;

/** Tools we build with — not client logos. */
export const stack = [
  "NEXT.JS",
  "ASTRO",
  "WEBFLOW",
  "SHOPIFY",
  "TYPESCRIPT",
  "FIGMA",
  "SANITY",
  "VERCEL",
] as const;

/**
 * Live sites we've built. Each card links out to the real thing.
 */
export type Project = {
  url: string;
  name: string;
  initials: string;
  kind: string;
  summary: string;
};

export const projects: Project[] = [
  {
    url: "https://izvorulalb.org",
    name: "Fundația Izvorul Alb",
    initials: "IA",
    kind: "Charity foundation",
    summary:
      "A village foundation in Bicaz, Neamț: its projects, news, and a podcast of local voices, with online donations through Stripe.",
  },
];

export type Service = {
  num: string;
  title: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    num: "01",
    title: "Web design",
    body: "Art direction, layout, motion, and copy that hold together on every breakpoint. Designed in the browser, not just the canvas.",
    points: ["Art direction", "UI & interaction", "Responsive systems"],
  },
  {
    num: "02",
    title: "Development",
    body: "Hand-built front ends in Next.js, Astro, or Webflow. Fast by default, accessible by default, easy for your team to edit.",
    points: ["Next.js & Astro", "Webflow & Shopify", "CMS integration"],
  },
  {
    num: "03",
    title: "Brand & identity",
    body: "Marks, type, palette, and voice — the parts of a brand that have to survive contact with a real product.",
    points: ["Visual identity", "Design systems", "Guidelines"],
  },
  {
    num: "04",
    title: "Growth & CRO",
    body: "We don't disappear at launch. Analytics, testing, and iteration until the numbers move in the right direction.",
    points: ["Landing pages", "A/B testing", "Performance audits"],
  },
];

export type Step = { when: string; title: string; body: string };

export const steps: Step[] = [
  {
    when: "W1",
    title: "Discover",
    body: "Interviews, analytics, and a hard look at the competition. We leave with a positioning line everyone agrees on.",
  },
  {
    when: "W2",
    title: "Direct",
    body: "Two art directions, in the browser, on real copy. You pick one; we stop guessing.",
  },
  {
    when: "W3–4",
    title: "Design",
    body: "Every page, every state, every breakpoint. Reviewed live each Friday — no month-long silences.",
  },
  {
    when: "W5–6",
    title: "Build & launch",
    body: "Production build, CMS wiring, QA, and a handoff session so your team owns it from day one.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What does a project cost?",
    a: "It depends on scope, so there's no price list here. Tell us what you need and you'll get a fixed number with a fixed scope — no hourly billing and no surprise invoices.",
  },
  {
    q: "How soon can you start?",
    a: "Usually two to three weeks out. If you're on a hard deadline, say so in your first message and you'll get an honest answer about whether it's achievable.",
  },
  {
    q: "Do you write the copy?",
    a: "Yes, on most projects. Design and words are the same decision. If you have a writer you love, we'll work with them directly instead.",
  },
  {
    q: "What do you need from us?",
    a: "One decision-maker, about two hours a week, and access to your analytics. That's genuinely it.",
  },
  {
    q: "Who owns the work?",
    a: "You do — files, source, and full rights on final payment. No licensing games, no hostage hosting.",
  },
  {
    q: "Can you work with our developers?",
    a: "Often. We'll deliver a component-level design system and pair with your team through implementation so nothing gets lost in translation.",
  },
];

export const budgetOptions = [
  "Under €10k",
  "€10k – €25k",
  "€25k – €50k",
  "€50k+",
  "Not sure yet",
] as const;
