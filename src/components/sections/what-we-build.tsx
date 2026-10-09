import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  AiIcon,
  AutomationIcon,
  CalendarIcon,
  CartIcon,
  ChartIcon,
  CloudIcon,
  CustomSoftwareIcon,
  DashboardIcon,
  LinkIcon,
  UserIcon,
} from "@/components/icons";
import { productTypes } from "@/lib/content/what-we-build";

type ProductName = (typeof productTypes)[number]["name"];

// One icon per product type; the record is keyed by name so adding a product
// type without an icon is a type error.
const icons: Record<ProductName, ComponentType<SVGProps<SVGSVGElement>>> = {
  "SaaS Platforms": CloudIcon,
  "AI Assistants": AiIcon,
  "Customer Portals": UserIcon,
  "Admin Dashboards": DashboardIcon,
  "Automation Platforms": AutomationIcon,
  "E-commerce Systems": CartIcon,
  "Booking Platforms": CalendarIcon,
  "CRM Integrations": LinkIcon,
  "Internal Business Tools": CustomSoftwareIcon,
  "Data-Driven Applications": ChartIcon,
};

export function WhatWeBuild() {
  return (
    <section className="border-b border-line-soft py-12 md:py-24">
      <Container>
        <SectionHeading
          title="Chances are, your project looks like one of these."
          description="A representative range of the products we design and build — not a limit on what we can take on."
        />

        <ul className="mt-8 grid grid-cols-1 gap-x-16 border-b border-line md:mt-14 md:grid-cols-2">
          {productTypes.map((item, i) => {
            const Icon = icons[item.name];
            return (
              <Reveal
                as="li"
                key={item.name}
                delay={(i % 2) * 60}
                className="flex items-start gap-4 border-t border-line py-4 md:py-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-line bg-paper-dim text-ink"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{item.name}</h3>
                  <p className="mt-1.5 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
