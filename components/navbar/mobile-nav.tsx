"use client";

import { useState } from "react";
import { Drawer } from "@base-ui/react/drawer";
import { ArrowUpRight, X } from "lucide-react";

import { Brand } from "@/components/navbar/brand";
import { buttonVariants } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import {
  AVAILABILITY_LABEL,
  CONTACT_CTA,
  DEFAULT_SECTION_ID,
  NAV_LINKS,
  NAV_SECTION_IDS,
  SOCIAL_LINKS,
  formatNavIndex,
  isNavLinkActive,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  readonly className?: string;
}

/** Krzywa „iOS sheet" — używana zarówno przez tło, jak i panel. */
const EASING = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/**
 * Menu mobilne: panel wysuwany płynnie z lewej krawędzi ekranu
 * (Base UI Drawer → pułapka fokusa, blokada przewijania, gest swipe w lewo).
 */
export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(NAV_SECTION_IDS, DEFAULT_SECTION_ID);

  const closeMenu = () => setOpen(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="left">
      <Drawer.Trigger
        aria-label="Otwórz menu nawigacji"
        className={cn(
          "group inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-on-surface outline-none transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        )}
      >
        <span aria-hidden className="flex w-4 flex-col items-start gap-1.25">
          <span className="h-px w-full bg-current transition-transform duration-300 ease-out group-hover:-translate-y-px" />
          <span className="h-px w-3/5 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:translate-y-px" />
        </span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(
            "fixed inset-0 z-60 min-h-dvh bg-[#050307]/80 backdrop-blur-[2px]",
            "opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-450",
            EASING,
            "data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0",
            "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            "supports-[-webkit-touch-callout:none]:absolute"
          )}
        />

        <Drawer.Viewport className="fixed inset-0 z-60 flex items-stretch justify-start">
          <Drawer.Popup
            className={cn(
              "relative flex h-full w-[min(20rem,86vw)] flex-col overflow-y-auto overscroll-contain",
              "border-r border-white/10 bg-surface-container-lowest/95 text-on-surface backdrop-blur-2xl",
              "shadow-[24px_0_60px_-30px_rgb(0_0_0/0.95)] outline-none touch-auto",
              "transform-translateX-[var(--drawer-swipe-movement-x)] transition-transform duration-450",
              EASING,
              "data-swiping:select-none data-swiping:duration-0",
              "data-starting-style:transform-[translateX(-100%)] data-ending-style:transform-[translateX(-100%)]",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]"
            )}
          >
            {/* Warstwa 0 wg DESIGN.md: poświata primary + siatka „developerska". */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_0%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_62%)]"
            />
            <span
              aria-hidden
              className="bg-grid pointer-events-none absolute inset-0 opacity-5"
            />

            <Drawer.Content className="relative flex min-h-full flex-col gap-8 p-6">
              <div className="flex items-center justify-between gap-4">
                <Brand compact onNavigate={closeMenu} />
                <Drawer.Close
                  aria-label="Zamknij menu"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-on-surface-variant outline-none transition-colors duration-300 hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <X aria-hidden className="size-4" />
                </Drawer.Close>
              </div>

              <div className="flex flex-col gap-3">
                <Drawer.Title className="text-label text-on-surface-variant/60">
                  Nawigacja
                </Drawer.Title>

                <nav aria-label="Nawigacja mobilna" className="-mx-3 flex flex-col">
                  {NAV_LINKS.map((link, index) => {
                    const active = isNavLinkActive(link, activeSection);

                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={closeMenu}
                        data-active={active}
                        aria-current={active ? "location" : undefined}
                        style={{ animationDelay: `${60 + index * 45}ms` }}
                        className="group/link animate-in fade-in slide-in-from-left-4 fill-mode-both relative flex items-center gap-4 rounded-xl px-3 py-3.5 text-on-surface-variant no-underline outline-none transition-colors duration-300 hover:bg-white/5 hover:text-on-surface focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:text-primary"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 scale-y-0 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-transform duration-300 ease-out group-data-[active=true]/link:scale-y-100"
                        />
                        <span className="font-mono text-xs text-on-surface-variant/45 transition-colors duration-300 group-hover/link:text-primary group-data-[active=true]/link:text-primary">
                          {formatNavIndex(index)}
                        </span>
                        <span className="text-lg font-medium tracking-[-0.02em]">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-4 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover/link:translate-x-0 group-hover/link:opacity-100"
                        />
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-auto flex flex-col gap-5 pt-6">
                <a
                  href={CONTACT_CTA.href}
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants({ variant: "gradient", size: "pill" }),
                    "h-11 w-full text-sm md:h-11"
                  )}
                >
                  {CONTACT_CTA.label}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>

                <p className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary/70" />
                    <span className="relative inline-flex size-2 rounded-full bg-tertiary" />
                  </span>
                  {AVAILABILITY_LABEL}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noreferrer noopener" : undefined}
                      className="text-label text-on-surface-variant/70 outline-none transition-colors duration-300 hover:text-primary focus-visible:text-primary"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
