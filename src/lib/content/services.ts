import type { ComponentType, SVGProps } from "react";
import {
  MobileIcon,
  WebIcon,
  CustomSoftwareIcon,
  BackendIcon,
} from "@/components/icons";

export type Service = {
  slug: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  summary: string;
  problem: string;
  build: string[];
  why: string;
};

export const services: Service[] = [
  {
    slug: "mobile",
    icon: MobileIcon,
    name: "Mobile Applications",
    summary:
      "Native iOS and Android apps, and cross-platform apps that share one codebase without feeling like a compromise.",
    problem:
      "Your customers live on their phones, but a mobile app is a long-term commitment — the wrong architecture or platform choice shows up months later as slow releases and rising maintenance cost.",
    build: [
      "Native iOS applications (Swift)",
      "Native Android applications (Kotlin)",
      "Cross-platform applications (React Native)",
      "Offline-first and sync-heavy apps",
      "In-app purchases and subscriptions",
      "App Store and Play Store release management",
    ],
    why:
      "We choose native or cross-platform based on your product's actual requirements, not on habit — so you get the right trade-off between speed, cost and long-term flexibility.",
  },
  {
    slug: "web",
    icon: WebIcon,
    name: "Web Applications",
    summary:
      "Fast, responsive web applications and SaaS platforms, from marketing site to full product dashboard.",
    problem:
      "A web product has to work for every visitor, on every device, and keep working as the team behind it grows — that means clean architecture from day one, not just a good-looking first release.",
    build: [
      "Marketing sites and product websites",
      "Customer portals and dashboards",
      "SaaS platforms and multi-tenant products",
      "Internal tools and admin panels",
      "E-commerce and booking platforms",
      "Progressive web apps",
    ],
    why:
      "We build on modern, widely-supported frameworks so the product is easy to hand off, easy to hire for, and easy to extend as your roadmap grows.",
  },
  {
    slug: "custom-software",
    icon: CustomSoftwareIcon,
    name: "Custom Software",
    summary:
      "Purpose-built software for the parts of your business that off-the-shelf tools were never designed to handle.",
    problem:
      "Generic software works until your business doesn't fit the generic shape anymore — then every workaround adds cost and every new hire needs a longer explanation of \"how we actually do it here.\"",
    build: [
      "Line-of-business applications",
      "Internal operations tooling",
      "Industry-specific platforms",
      "Legacy system modernization",
      "Data-driven applications and internal reporting tools",
      "Multi-user, role-based systems",
    ],
    why:
      "We start from how your business actually operates, then design software around that reality — instead of asking your team to adapt to a tool that almost fits.",
  },
  {
    slug: "backend",
    icon: BackendIcon,
    name: "Backend & APIs",
    summary:
      "The infrastructure layer underneath every product we build — reliable, observable, and built to scale with you.",
    problem:
      "The backend is invisible when it works and expensive when it doesn't — most costly rebuilds trace back to architecture decisions nobody revisited early enough.",
    build: [
      "REST and GraphQL APIs",
      "Authentication and authorization systems",
      "Third-party integrations",
      "Database design and data modeling",
      "Cloud infrastructure (AWS, GCP, Azure)",
      "Monitoring, logging and on-call readiness",
    ],
    why:
      "We design backends for the product's actual growth curve — resilient enough for production, simple enough that your team can still reason about it a year later.",
  },
];
