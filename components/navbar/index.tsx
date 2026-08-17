import Link from "next/link"
import { Code } from "lucide-react"

import { Brand } from "@/components/navbar/brand"
import { DesktopNav } from "@/components/navbar/desktop-nav"
import { MobileNav } from "@/components/navbar/mobile-nav"
import { NavbarShell } from "@/components/navbar/navbar-shell"
import { buttonVariants } from "@/components/ui/button"
import { CONTACT_CTA, SOURCE_CODE_LINK } from "@/lib/navigation"
import { cn } from "@/lib/utils"

/**
 * Główna nawigacja AJAREK DEV.
 *
 * Układ (wg `public/patterns/navbar.png`):
 * `</>` + AJAREK DEV | Start · Projekty · Technologie · O mnie · Kontakt | `<>` + „Skontaktuj się"
 *
 * Poniżej breakpointu `lg` linki przenoszą się do wysuwanego menu (od lewej strony).
 * Komponent pozostaje serwerowy — interaktywne są wyłącznie jego części.
 */
export function Navbar() {
  return (
    <NavbarShell>
      <MobileNav className='lg:hidden' />

      <Brand />

      <DesktopNav />

      <div className='ml-auto flex items-center gap-1 md:gap-3 lg:ml-0'>
        <a
          href={SOURCE_CODE_LINK.href}
          target='_blank'
          rel='noreferrer noopener'
          aria-label={SOURCE_CODE_LINK.label}
          title={SOURCE_CODE_LINK.label}
          className='hidden size-9 items-center justify-center rounded-full text-on-surface/85 outline-none transition-colors duration-300 hover:bg-white/5 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 md:inline-flex'
        >
          <Code aria-hidden strokeWidth={2} className='size-6' />
        </a>

        <Link
          href={CONTACT_CTA.href}
          className={cn(
            buttonVariants({ variant: "gradient", size: "pill" }),
            "hidden min-[400px]:inline-flex",
          )}
        >
          <span className='hidden sm:inline'>{CONTACT_CTA.label}</span>
          <span className='sm:hidden'>{CONTACT_CTA.shortLabel}</span>
        </Link>
      </div>
    </NavbarShell>
  )
}
