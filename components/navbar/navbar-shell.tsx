"use client"

import type { ReactNode } from "react"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

interface NavbarShellProps {
  readonly children: ReactNode
}

/**
 * Szkielet nagłówka: przyklejony pasek, który po przewinięciu zmienia się
 * w szklaną taflę (DESIGN.md → „Glass Stack"), oraz gradientowy wskaźnik
 * postępu czytania na dolnej krawędzi.
 *
 * Zawartość jest przekazywana jako `children` z komponentu serwerowego,
 * dzięki czemu tylko logika przewijania trafia do bundla klienta.
 */
export function NavbarShell({ children }: NavbarShellProps) {
  const { scrolled, progressRef } = useScrollProgress()

  return (
    <header
      data-scrolled={scrolled}
      className='sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,border-color,box-shadow] duration-500 data-[scrolled=true]:border-white/[0.07] data-[scrolled=true]:bg-surface-container-lowest/70 data-[scrolled=true]:shadow-[0_18px_40px_-28px_rgb(0_0_0/0.95)] data-[scrolled=true]:backdrop-blur-xl'
    >
      <div className='mx-auto flex h-14 w-full max-w-300 items-center gap-3 px-5 md:h-16 md:px-10'>
        {children}
      </div>

      <span
        ref={progressRef}
        aria-hidden
        data-visible={scrolled}
        className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4)] opacity-0 transition-opacity duration-500 data-[visible=true]:opacity-100'
      />
    </header>
  )
}
