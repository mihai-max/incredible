/**
 * Site copy lives here so the components stay presentational.
 * Editing the site is mostly editing this file.
 *
 * NOTE: the clients, case studies, testimonial, stats, and prices below are
 * placeholders written to demonstrate the layout. Replace them with real
 * projects before publishing.
 */

export const site = {
  name: "incredible.website",
  url: "https://incredible.website",
  tagline: "Web Design Studio",
  description:
    "incredible.website is a web design studio building cinematic, fast, conversion-focused websites for ambitious brands.",
  email: "hello@incredible.website",
  phone: "+1 (512) 555-0142",
  phoneHref: "tel:+15125550142",
  location: "Austin, TX · remote worldwide",
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
] as const;

export const clients = [
  "NORTHWIND",
  "OBSIDIAN",
  "LUMEN LABS",
  "ATLAS & CO",
  "VERTA",
  "SALTBOX",
  "HELIOSTAT",
  "KIN & KIND",
] as const;

export const stats = [
  { value: "60+", label: "Sites shipped" },
  { value: "2.4×", label: "Median lift in conversion" },
  { value: "6 wks", label: "Typical launch window" },
  { value: "98", label: "Average Lighthouse score" },
] as const;

export type Project = {
  id: string;
  name: string;
  initials: string;
  tag: string;
  note: string;
};

export const projects: Project[] = [
  {
    id: "northwind",
    name: "Northwind",
    initials: "NW",
    tag: "Brand site · Webflow",
    note: "A climate analytics platform rebuilt around one story instead of nine. +180% demo requests in the first quarter.",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    initials: "OB",
    tag: "Product marketing · Next.js",
    note: "Security tooling made legible. Dark, quiet, and precise — with a docs experience engineers actually finish.",
  },
  {
    id: "lumen",
    name: "Lumen Labs",
    initials: "LL",
    tag: "Full rebrand · Design system",
    note: "Identity, site, and a 40-component library shipped in seven weeks. One language across every surface.",
  },
  {
    id: "saltbox",
    name: "Saltbox",
    initials: "SB",
    tag: "E-commerce · Shopify",
    note: "A slow, beautiful store made fast. 1.9s to interactive on mobile and a checkout that stopped leaking.",
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

export const testimonial = {
  quote:
    "We'd been through two agencies before this one. They got us to a direction in nine days and a live site in six weeks — and it's still the best-performing page we own.",
  name: "Dana Reyes",
  role: "VP Marketing, Northwind",
} as const;

export type Tier = {
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const tiers: Tier[] = [
  {
    name: "Landing",
    price: "$6k",
    unit: "starting",
    desc: "One page that does one job extremely well.",
    features: ["Strategy session", "1 art direction", "Design + build", "2 weeks"],
    cta: "Enquire",
  },
  {
    name: "Full site",
    price: "$24k",
    unit: "starting",
    desc: "The whole marketing site, end to end.",
    features: [
      "Discovery & positioning",
      "2 art directions",
      "Up to 8 pages",
      "CMS + handoff",
      "6 weeks",
    ],
    cta: "Book a call",
    featured: true,
    badge: "Most requested",
  },
  {
    name: "Partner",
    price: "$7k",
    unit: "/ month",
    desc: "An embedded design team, month to month.",
    features: [
      "Ongoing design & build",
      "Experiments & CRO",
      "Priority turnaround",
      "Cancel anytime",
    ],
    cta: "Enquire",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How soon can you start?",
    a: "We take on two projects a month and usually book two to three weeks out. If you're on a hard deadline, say so in your first message and we'll tell you honestly whether we can hit it.",
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
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "Not sure yet",
] as const;
