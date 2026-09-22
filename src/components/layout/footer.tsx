import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNav, siteConfig, socialLinks } from "@/lib/site-config";
import { ChatIcon, MailIcon, PinIcon } from "@/components/icons";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-inverse">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-paper/80 transition-colors hover:text-paper"
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
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <span className="flex items-center gap-2.5 font-mono text-[0.9375rem] font-medium text-paper">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              {siteConfig.name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              We build mobile apps, web products, AI systems and automation
              that solve real business problems.
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-paper/80 hover:text-paper"
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
                  className="flex items-center gap-2 text-sm text-paper/80 hover:text-paper"
                >
                  <ChatIcon className="h-4 w-4 shrink-0" />
                  WhatsApp {siteConfig.whatsapp}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-paper/80">
                <PinIcon className="h-4 w-4 shrink-0" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-inverse-soft pt-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <CookieSettingsButton className="hover:text-paper" />
            {socialLinks
              .filter((link) => link.href)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
