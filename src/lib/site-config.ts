const PRODUCTION_URL = "https://www.prakritsolutions.in";

export const siteConfig = {
  name: "Prakrit Solutions",
  shortName: "Prakrit",
  tagline: "We build technology that solves real business problems.",
  description:
    "Prakrit Solutions is a software development agency building mobile apps, web applications, AI-powered products and business automation for growing companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL,
  email: "hello@prakritsolutions.in",
  phone: "[Phone Number]",
  address: "[Office Address]",
  location: "[City, Country]",
  social: {
    linkedin: "[LinkedIn URL]",
    twitter: "[Twitter / X URL]",
    github: "[GitHub URL]",
  },
} as const;

// True on any deployment that isn't the final production domain — the
// draft/staging subdomain used for feedback before this goes live.
export const isDraftEnvironment = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL !== PRODUCTION_URL
  : false;

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  services: [
    { label: "Mobile Applications", href: "/services#mobile" },
    { label: "Web Applications", href: "/services#web" },
    { label: "Custom Software", href: "/services#custom-software" },
    { label: "Backend & APIs", href: "/services#backend" },
  ],
  solutions: [
    { label: "AI Solutions", href: "/solutions#ai" },
    { label: "Automation", href: "/solutions#automation" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
