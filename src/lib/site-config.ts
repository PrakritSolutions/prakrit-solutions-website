const PRODUCTION_URL = "https://prakritsolutions.in";

export const siteConfig = {
  name: "Prakrit Solutions",
  shortName: "Prakrit",
  tagline: "We build technology that solves real business problems.",
  description:
    "Prakrit Solutions is a software development agency building mobile apps, web applications, AI-powered products and business automation for growing companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL,
  email: "hello@prakritsolutions.in",
  privacyEmail: "privacy@prakritsolutions.in",
  noreplyEmail: "noreply@prakritsolutions.in",
  whatsapp: "+91-9033519764",
  whatsappUrl: "https://wa.me/919033519764",
  hours: "Monday to Friday, 10 AM to 6 PM IST",
  bookingUrl: "https://calendly.com/mail-prakritsolutions/30min",
  location: "Surat, Gujarat, India",
} as const;

// Shown on /about. Set `photo` (a path under /public, for example
// "/brand/founder.jpg") and `linkedin` (a personal profile URL) when they
// exist; until then the block shows initials and omits the link.
export const founder = {
  name: "Vaibhav Jhaveri",
  title: "Founder",
  photo: "",
  linkedin: "",
  bio: [
    "Prakrit Solutions is run by Vaibhav Jhaveri. Enquiries are read and answered personally, so the person you talk to first is the person accountable for the work.",
  ],
} as const;

// Leave href empty until the profile exists — links with no URL are not rendered.
export const socialLinks: {
  label: string;
  href: string;
  icon: "linkedin" | "x" | "instagram" | "facebook" | "github";
}[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/prakritsolutions/", icon: "linkedin" },
  { label: "X (Twitter)", href: "", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/prakritsolutions/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/prakritsolutions/", icon: "facebook" },
  { label: "GitHub", href: "https://github.com/PrakritSolutions", icon: "github" },
];

// True on any deployment that isn't the final production domain — the
// draft/staging subdomain used for feedback before this goes live.
export const isDraftEnvironment = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL !== PRODUCTION_URL
  : false;

// Server-only switch (not NEXT_PUBLIC — no need to ship it to the client).
// Set COMING_SOON=true on the Production environment in Vercel to take the
// real site down and show a placeholder page instead, without a code
// change or losing the deployment underneath it.
export const isComingSoon = process.env.COMING_SOON === "true";

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
