import type { Metadata } from "next"

import { ProjectsGrid } from "@/components/projects/projects-grid"
import { PROJECTS } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projekty",
  description:
    "Wszystkie realizacje AJAREK DEV — sklepy e-commerce, platformy rezerwacyjne i aplikacje premium. Filtruj po technologii lub szukaj po nazwie.",
}

/**
 * Strona `/projekty` — wszystkie realizacje z `lib/projects.ts`
 * (jedno źródło prawdy) wyświetlane w siatce z filtrowaniem.
 * Dane pobiera strona serwerowa, interakcję obsługuje `ProjectsGrid`.
 */
export default function ProjectsPage() {
  return (
    <main className='relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-10 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10'>
      {/* Jednolite tło strony — siatka „developerska" (DESIGN.md). */}
      <div className='pointer-events-none absolute inset-0 bg-grid opacity-25' />

      <div className='relative mx-auto flex max-w-7xl flex-col gap-8'>
        {/* ——— Nagłówek strony ——— */}
        <header className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl space-y-4'>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <span className='text-label inline-flex items-center gap-2 text-primary'>
                <span className='size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]' />
                Portfolio
              </span>
              <span className='font-mono text-xs tracking-[0.2em] text-on-surface-variant/60'>
                ~/projekty
              </span>
            </div>
            <h1 className='text-headline-lg-responsive text-foreground'>
              Wszystkie <span className='text-primary'>projekty</span>
            </h1>
            <p className='max-w-xl text-body-lg text-muted-foreground'>
              Pełne zestawienie realizacji — od sklepów e-commerce po platformy
              rezerwacyjne. Filtruj po technologii lub szukaj po nazwie.
            </p>
          </div>

          <p className='flex items-center gap-2 font-mono text-sm tracking-[0.15em] text-on-surface-variant/70'>
            <span
              aria-hidden
              className='inline-flex size-2 rounded-full bg-tertiary shadow-[0_0_10px_var(--tertiary)]'
            />
            {String(PROJECTS.length).padStart(2, "0")} realizacji
          </p>
        </header>

        <ProjectsGrid projects={PROJECTS} />
      </div>
    </main>
  )
}
