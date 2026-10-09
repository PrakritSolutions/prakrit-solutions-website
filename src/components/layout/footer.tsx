import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNav, siteConfig, socialLinks } from "@/lib/site-config";
import {
  ChatIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
  XIcon,
} from "@/components/icons";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";

const socialIcons = {
  linkedin: LinkedinIcon,
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  github: GithubIcon,
} as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="md:pt-2">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-inverse">
        {title}
      </h2>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-11 items-center text-sm text-paper/80 transition-colors hover:text-paper md:min-h-9"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-inverse bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <span className="flex items-center gap-2.5 font-mono text-base font-medium text-paper lg:gap-3 lg:text-lg">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 lg:h-8 lg:w-8"
              />
              {siteConfig.name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              We build mobile apps, web products, AI systems and automation
              that solve real business problems.
            </p>
            <ul className="mt-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex min-h-11 items-center gap-2 text-sm text-paper/80 hover:text-paper md:min-h-9"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 text-sm text-paper/80 hover:text-paper md:min-h-9"
                >
                  <ChatIcon className="h-4 w-4 shrink-0" />
                  WhatsApp {siteConfig.whatsapp}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2 text-sm text-paper/80 md:min-h-9">
                <PinIcon className="h-4 w-4 shrink-0" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          <FooterColumn
            title="What we do"
            links={[...footerNav.services, ...footerNav.solutions]}
          />
          <FooterColumn title="Company" links={footerNav.company} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-inverse-soft pt-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-x-8 gap-y-1 md:flex-row md:flex-wrap md:items-center">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6">
              {footerNav.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center hover:text-paper md:min-h-9"
                >
                  {link.label}
                </Link>
              ))}
              <CookieSettingsButton className="min-h-11 hover:text-paper md:min-h-9" />
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ul className="-mr-2.5 flex items-center">
              {socialLinks
                .filter((link) => link.href)
                .map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.label}
                        className="flex h-11 w-11 items-center justify-center hover:text-paper"
                      >
                        <Icon className="h-[1.375rem] w-[1.375rem]" />
                        <span className="sr-only">
                          {link.label} (opens in a new tab)
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
