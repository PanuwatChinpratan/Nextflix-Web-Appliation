"use client";

import dynamic from "next/dynamic";
import { UserRound } from "lucide-react";
import Link from "next/link";

import { SearchPanel } from "@/components/search-panel";
import { useI18n } from "@/lib/i18n";

const ClientModeToggle = dynamic(
  () =>
    import("@/components/toggle-mode-theme").then((mod) => ({
      default: mod.ModeToggle,
    })),
  { ssr: false },
);

const ClientLanguageToggle = dynamic(
  () =>
    import("@/components/language-toggle").then((mod) => ({
      default: mod.LanguageToggle,
    })),
  { ssr: false },
);

export function SiteHeader() {
  const { t } = useI18n();

  const navItems = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.tvShows"), href: "#hero" },
    { label: t("nav.movies"), href: "#hero" },
    { label: t("nav.newPopular"), href: "#popular" },
    { label: t("nav.myList"), href: "#my-list" },
    { label: t("nav.languages"), href: "#popular" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 hidden bg-gradient-to-b from-white/90 via-white/55 to-white/10 px-6 py-5 text-foreground shadow-sm backdrop-blur-sm dark:from-black/80 dark:via-black/20 dark:to-transparent dark:text-white sm:block md:px-8 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/"
            className="text-2xl font-black uppercase tracking-[0.18em] text-[#e50914]"
          >
            Netflix
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-foreground/80 dark:text-white/80 md:flex lg:gap-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-foreground dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 text-foreground dark:text-white md:flex lg:gap-4">
          <SearchPanel />
          <span className="text-sm text-white/80">Kids</span>
          <UserRound className="h-6 w-6 cursor-pointer" aria-hidden="true" />
          <ClientModeToggle />
          <ClientLanguageToggle />
        </div>
      </div>
    </header>
  );
}
