import Link from "next/link"
import { CodeXml } from "lucide-react"

import { BRAND } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface BrandProps {
  readonly className?: string
  /** Wersja zmniejszona — używana w nagłówku wysuwanego menu. */
  readonly compact?: boolean
  /** Wywoływane po kliknięciu (np. zamknięcie menu mobilnego). */
  readonly onNavigate?: () => void
}

/**
 * Znak marki: monogram `</>` w kolorze primary + logotyp AJAREK DEV.
 * Po najechaniu ikona zyskuje delikatną poświatę (DESIGN.md → „Glow").
 */
export function Brand({ className, compact = false, onNavigate }: BrandProps) {
  return (
    <Link
      href={BRAND.href}
      onClick={onNavigate}
      aria-label={`${BRAND.name} — ${BRAND.tagline}`}
      className={cn(
        "group/brand relative flex shrink-0 items-center gap-1.5 rounded-lg outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <span className='relative flex items-center justify-center'>
        <span
          aria-hidden
          className='absolute size-7 rounded-full bg-primary/30 opacity-0 blur-lg transition-opacity duration-500 group-hover/brand:opacity-100'
        />
        <CodeXml
          aria-hidden
          strokeWidth={2}
          className={cn(
            "relative text-primary transition-transform duration-500 ease-out group-hover/brand:scale-105",
            compact ? "size-8" : "size-8 md:size-11",
          )}
        />
      </span>
      <span
        className={cn(
          "font-bold leading-none tracking-[-0.04em] whitespace-nowrap text-on-surface",
          compact ? "text-lg" : "text-lg sm:text-xl md:text-[1.75rem]",
        )}
      >
        {BRAND.name}
      </span>
    </Link>
  )
}
