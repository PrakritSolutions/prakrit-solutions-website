"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { primaryNav, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[0.9375rem] font-medium tracking-tight text-ink"
        >
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
            priority
          />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.9375rem] transition-colors hover:text-accent ${
                  active ? "text-ink font-medium" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="md">
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </Container>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-paper md:hidden">
          <nav
            className="flex flex-1 flex-col gap-1 px-6 pt-6"
            aria-label="Mobile"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-4 text-xl font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-line-soft px-6 py-6">
            <Button
              href="/contact"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Start a Project
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
