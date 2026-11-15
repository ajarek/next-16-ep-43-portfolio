import { AboutCta } from "@/components/about/about-cta"
import { AboutHero } from "@/components/about/about-hero"
import { AboutManifesto } from "@/components/about/about-manifesto"
import { AboutPassions } from "@/components/about/about-passions"
import { AboutTimeline } from "@/components/about/about-timeline"
import { AboutValues } from "@/components/about/about-values"
import { AboutWorkflow } from "@/components/about/about-workflow"
import { ContactSpotlight } from "@/components/contact/contact-spotlight"
import { ABOUT_DATA } from "@/lib/about"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "O mnie",
  description:
    "Poznaj AJAREK DEV — Full-Stack i UI Developera. Zobacz podejście do architektury, projektowania interfejsów, wydajności i realizacji projektów webowych.",
  path: "/about-me",
})

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
    video,
    values,
    milestones,
    workflow,
    passions,
    cta,
  } = ABOUT_DATA

  return (
    <div
      id='o-mnie'
      className='relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-10 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10'
    >
      {/* Jednolite tło strony — siatka „developerska" (DESIGN.md) */}
      <div className='pointer-events-none absolute inset-0 bg-grid opacity-25' />
      <ContactSpotlight />

      <div className='relative mx-auto flex max-w-7xl flex-col gap-14 pb-8'>
        {/* ——— Sekcja Hero z wideo-wizytówką na początku strony ——— */}
        <AboutHero page={page} stats={stats} video={video} />

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
    </div>
  )
}
