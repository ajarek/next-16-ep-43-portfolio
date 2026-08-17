import Link from "next/link"
import { CodeXml } from "lucide-react"

import { FOOTER } from "@/lib/footer"

/**
 * Stopka AJAREK DEV — odwzorowuje wzorzec `public/patterns/footer.png`:
 * pojedynczy rząd z marką po lewej, linkami społecznościowymi w środku
 * i złotym napisem copyright po prawej, na niemal czarnym tle z subtelną
 * siatką „developerską" (DESIGN.md → „The Grid Backdrop").
 */
export function Footer() {
  return (
    <footer className='relative isolate overflow-hidden border-t border-white/6 bg-[#0c0d12]'>
      {/* Górna gradientowa linia — spójna z paskiem postępu navbara. */}
      <span
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#8069BF,#06B6D4,transparent)] opacity-60'
      />

      {/* Subtelna siatka „developerska" + delikatna poświata u góry. */}
      <span
        aria-hidden
        className='bg-grid pointer-events-none absolute inset-0 opacity-[0.06]'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute -top-28 left-1/2 h-48 w-xl -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl'
      />

      <div className='relative mx-auto flex w-full max-w-300 flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:gap-8 md:px-10 md:py-10'>
        {/* ——— Marka ——— */}
        <Link
          href='/'
          aria-label={`${FOOTER.brand} DEV — powrót na początek strony`}
          className='group/brand relative flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
        >
          <span className='relative flex items-center justify-center'>
            <span
              aria-hidden
              className='absolute size-6 rounded-full bg-primary/30 opacity-0 blur-lg transition-opacity duration-500 group-hover/brand:opacity-100'
            />
            <CodeXml
              aria-hidden
              strokeWidth={2}
              className='relative size-6 text-primary transition-transform duration-500 ease-out group-hover/brand:scale-105'
            />
          </span>
          <span className='text-lg font-bold uppercase leading-none tracking-[-0.02em] whitespace-nowrap text-on-surface'>
            {FOOTER.brand}
          </span>
        </Link>

        {/* ——— Linki społecznościowe ——— */}
        <nav
          aria-label='Linki społecznościowe'
          className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8'
        >
          {FOOTER.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className='group/link relative py-1 text-sm font-medium tracking-[-0.01em] text-on-surface-variant outline-none transition-colors duration-300 hover:text-on-surface focus-visible:text-primary'
            >
              {link.label}
              {/* Świecące podkreślenie — echo navbara desktopowego. */}
              <span
                aria-hidden
                className='absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary shadow-[0_0_8px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-transform duration-300 ease-out group-hover/link:scale-x-100'
              />
            </a>
          ))}
        </nav>

        {/* ——— Copyright ——— */}
        <p className='flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-tertiary'>
          <span aria-hidden className='size-1.5 rounded-full bg-tertiary/80' />©{" "}
          {FOOTER.year} {FOOTER.name}. {FOOTER.tagline}
        </p>
      </div>
    </footer>
  )
}
