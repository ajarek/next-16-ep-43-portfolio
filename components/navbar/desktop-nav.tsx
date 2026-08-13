"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useActiveSection } from "@/hooks/use-active-section";
import {
  DEFAULT_SECTION_ID,
  NAV_LINKS,
  NAV_SECTION_IDS,
  NavSectionId,
  isNavLinkActive,
} from "@/lib/navigation";

interface UnderlineRect {
  left: number;
  width: number;
}

/**
 * Nawigacja desktopowa wyśrodkowana między logotypem a akcjami.
 * Aktywna pozycja jest wykrywana przez obserwator sekcji i trasę,
 * a podkreślenie (efekt „magic line") natychmiast i płynnie przeskakuje
 * do wybranego linku po kliknięciu lub przewinięciu strony.
 */
export function DesktopNav() {
  const activeSection = useActiveSection(NAV_SECTION_IDS, DEFAULT_SECTION_ID);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [underline, setUnderline] = useState<UnderlineRect | null>(null);

  /** Mierzy pozycję wskazanego lub aktualnego linku względem kontenera nawigacji */
  const updateUnderlinePosition = useCallback((targetSectionId: string) => {
    const activeLink = linkRefs.current.get(targetSectionId);
    const nav = navRef.current;
    if (!activeLink || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setUnderline({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, []);

  // Przeliczanie pozycji przy zmianie aktywnej sekcji oraz przy zmianie rozmiaru okna
  useEffect(() => {
    updateUnderlinePosition(activeSection);

    const handleResize = () => {
      updateUnderlinePosition(activeSection);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection, updateUnderlinePosition]);

  /** Natychmiastowe przeskoczenie podkreślenia do klikniętego elementu */
  const handleLinkClick = (linkId: NavSectionId) => {
    updateUnderlinePosition(linkId);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Nawigacja główna"
      className="relative hidden flex-1 items-center justify-center gap-8 lg:flex"
    >
      {NAV_LINKS.map((link) => {
        const active = isNavLinkActive(link, activeSection);

        return (
          <Link
            key={link.id}
            ref={(el) => {
              if (el) {
                linkRefs.current.set(link.id, el);
              } else {
                linkRefs.current.delete(link.id);
              }
            }}
            href={link.href}
            title={link.description}
            data-active={active}
            aria-current={active ? "location" : undefined}
            onClick={() => handleLinkClick(link.id)}
            className="group relative rounded-sm py-2 text-[0.95rem] font-medium tracking-[-0.01em] text-on-surface-variant outline-none transition-colors duration-300 hover:text-on-surface focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:text-primary"
          >
            {link.label}

            {/* Podkreślenie hover — widoczne tylko gdy link nie jest aktywny */}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary/40 transition-transform duration-300 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-0"
            />
          </Link>
        );
      })}

      {/* Przeskakujące podkreślenie — jeden element przesuwający się płynnie między linkami */}
      {underline !== null && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 h-0.5 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_65%,transparent)]"
          style={{
            left: underline.left,
            width: underline.width,
            transition:
              "left 350ms cubic-bezier(0.34, 1.56, 0.64, 1), width 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      )}
    </nav>
  );
}
