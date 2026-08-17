import type { Metadata } from "next"

import { AboutCta } from "@/components/about/about-cta"
import { AboutManifesto } from "@/components/about/about-manifesto"
import { AboutPassions } from "@/components/about/about-passions"
import { AboutTimeline } from "@/components/about/about-timeline"
import { AboutValues } from "@/components/about/about-values"
import { AboutWorkflow } from "@/components/about/about-workflow"
import { ContactSpotlight } from "@/components/contact/contact-spotlight"
import { ABOUT_DATA } from "@/lib/about"

export const metadata: Metadata = {
  title: "O mnie",
  description:
    "Poznaj profil AJAREK DEV — Full-Stack & UI Developer. Filozofia rzemiosła, architektura systemów, wartości inżynierskie i ścieżka rozwoju.",
}

/**
 * Strona `/about-me` — pełny profil dewelopera, wartości, ścieżka i metodologia pracy.
 * Dane i typy pochodzą z `lib/about.ts` (oraz `public/data/about.json`).
 */
export default function AboutMePage() {
  const {
    page,
    stats,
    manifesto,
    developerProfile,
    values,
    milestones,
    workflow,
    passions,
    cta,
  } = ABOUT_DATA

  return (
    <main
      id='o-mnie'
      className='relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-10 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10'
    >
      {/* Jednolite tło strony — siatka „developerska" (DESIGN.md) */}
      <div className='pointer-events-none absolute inset-0 bg-grid opacity-25' />
      <ContactSpotlight />

      <div className='relative mx-auto flex max-w-7xl flex-col gap-14 pb-8'>
        {/* ——— Nagłówek strony ——— */}
        <header className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl space-y-4'>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <span className='text-label inline-flex items-center gap-2 text-primary'>
                <span className='size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]' />
                {page.overline}
              </span>
              <span className='font-mono text-xs tracking-[0.2em] text-on-surface-variant/60'>
                {page.path}
              </span>
            </div>
            <h1 className='text-headline-lg-responsive text-foreground'>
              {page.heading}{" "}
              <span className='text-primary'>{page.headingAccent}</span>
            </h1>
            <p className='max-w-xl text-body-lg text-muted-foreground'>
              {page.description}
            </p>
          </div>

          <dl className='flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm tracking-[0.15em] text-on-surface-variant/70'>
            {stats.map((stat, index) => {
              const dotColors = [
                "bg-tertiary shadow-[0_0_10px_var(--tertiary)]",
                "bg-primary shadow-[0_0_10px_var(--primary)]",
                "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
              ]
              const dotColor = dotColors[index % dotColors.length]

              return (
                <div key={stat.label} className='flex items-center gap-2'>
                  <span
                    aria-hidden
                    className={`inline-flex size-2 rounded-full ${dotColor}`}
                  />
                  <dt className='sr-only'>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              )
            })}
          </dl>
        </header>

        {/* ——— Manifest & Interaktywny profil ——— */}
        <AboutManifesto
          manifesto={manifesto}
          developerProfile={developerProfile}
        />

        {/* ——— Filary inżynierii i wartości ——— */}
        <AboutValues values={values} />

        {/* ——— Ścieżka rozwoju i kamienie milowe ——— */}
        <AboutTimeline milestones={milestones} />

        {/* ——— Metodologia i proces pracy ——— */}
        <AboutWorkflow workflow={workflow} />

        {/* ——— Pasje i eksperymenty R&D ——— */}
        <AboutPassions passions={passions} />

        {/* ——— Karta CTA ——— */}
        <AboutCta cta={cta} />
      </div>
    </main>
  )
}
