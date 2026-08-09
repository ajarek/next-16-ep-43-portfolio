"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import {
  DEFAULT_SECTION_ID,
  NAV_LINKS,
  NAV_SECTION_IDS,
  isNavLinkActive,
} from "@/lib/navigation";

/**
 * Nawigacja desktopowa wyśrodkowana między logotypem a akcjami.
 * Aktywna pozycja jest wykrywana przez obserwator sekcji i podkreślana
 * animowaną, świecącą kreską w kolorze primary.
 */
export function DesktopNav() {
  const activeSection = useActiveSection(NAV_SECTION_IDS, DEFAULT_SECTION_ID);

  return (
    <nav
      aria-label="Nawigacja główna"
      className="hidden flex-1 items-center justify-center gap-8 lg:flex"
    >
      {NAV_LINKS.map((link) => {
        const active = isNavLinkActive(link, activeSection);

        return (
          <a
            key={link.id}
            href={link.href}
            title={link.description}
            data-active={active}
            aria-current={active ? "location" : undefined}
            className="group relative rounded-sm py-2 text-[0.95rem] font-medium tracking-[-0.01em] text-on-surface-variant outline-none transition-colors duration-300 hover:text-on-surface focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:text-primary"
          >
            {link.label}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-transform duration-300 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
            />
          </a>
        );
      })}
    </nav>
  );
}
