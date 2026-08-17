import type { ReactNode } from "react"

import type { Project, ProjectImage, ProjectVisual } from "@/lib/projects"
import { cn } from "@/lib/utils"
import Image from "next/image"

/**
 * Miniatury kart projektów — warianty stylizowanych „mockupów", których
 * akcenty napędzane są zmienną `--project-accent` ustawianą przez kartę projektu.
 *
 * Dane miniaturek (src/alt) nie są zapisane na sztywno w komponentach —
 * pochodzą z definicji projektów w `lib/projects.ts` i są mapowane na
 * warianty przez słownik `VISUALS`.
 */

/** Właściwości wspólne dla każdego wariantu miniatury. */
interface VisualProps {
  /** Obraz miniatury pobrany z definicji projektu w `lib/projects.ts`. */
  readonly image: ProjectImage
}

/** Górny pasek „okna przeglądarki" — spójny z motywem developerskim. */
function WindowChrome() {
  return (
    <div className='flex h-8 items-center gap-2 border-b border-white/5 bg-black/25 px-3'>
      <span className='flex gap-1.5'>
        <span className='size-2 rounded-full bg-[#ff5f57]/80' />
        <span className='size-2 rounded-full bg-[#febc2e]/80' />
        <span className='size-2 rounded-full bg-[#28c840]/80' />
      </span>
      <span className='ml-1 h-2.5 flex-1 rounded-full bg-white/6' />
      <span className='h-2.5 w-10 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_25%,transparent)]' />
    </div>
  )
}

/** Miniatura projektu E-commerce Stek-Butik (wariant dashboard). */
function DashboardVisual({ image }: VisualProps) {
  return (
    <div className='relative flex h-full flex-col'>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover object-top'
        loading='eager'
      />
    </div>
  )
}

/** Miniatura projektu Glamping Booking (wariant booking). */
function BookingVisual({ image }: VisualProps) {
  return (
    <div className='relative flex h-full flex-col px-4 pb-3 pt-2'>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover object-top'
        loading='eager'
      />
    </div>
  )
}

/** Miniatura projektu E-commerce Jeans-Shop (wariant shop). */
function ShopVisual({ image }: VisualProps) {
  return (
    <div className='relative grid h-full grid-cols-3 grid-rows-2 gap-1.5 p-3'>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover object-top'
        loading='eager'
      />
    </div>
  )
}

/** Miniatura z samym obrazem na tle (warianty platform i luxe-auto). */
function ImageVisual({ image }: VisualProps) {
  return (
    <div className='relative flex h-full flex-col justify-center gap-2 px-4 py-2'>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover object-top'
        loading='eager'
      />
    </div>
  )
}

/**
 * Mapowanie wariantu wizualizacji (pole `visual` z `lib/projects.ts`)
 * na komponent miniatury — jedyne miejsce rejestracji wariantów.
 */
const VISUALS: Record<ProjectVisual, (props: VisualProps) => ReactNode> = {
  dashboard: DashboardVisual,
  booking: BookingVisual,
  shop: ShopVisual,
  platform: ImageVisual,
  "luxe-auto": ImageVisual,
}

interface ProjectVisualProps {
  readonly project: Project
  readonly className?: string
}

export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const Visual = VISUALS[project.visual]

  return (
    <div
      aria-hidden
      className={cn(
        "relative h-40 shrink-0 overflow-hidden bg-[linear-gradient(160deg,color-mix(in_oklab,var(--project-accent)_12%,var(--surface-container-high))_0%,var(--surface-container-low)_70%)]",
        className,
      )}
    >
      {/* Siatka „developerska" w tle miniatury. */}
      <span className='bg-grid pointer-events-none absolute inset-0 opacity-10' />
      <span className='pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_22%,transparent)] blur-2xl' />

      <div className='absolute inset-0'>
        <Visual image={project.image} />
      </div>

      <WindowChrome />
    </div>
  )
}
