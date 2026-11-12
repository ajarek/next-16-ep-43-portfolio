import type { ReactNode } from "react"
import Image from "next/image"

import type { Project, ProjectImage, ProjectVisual } from "@/lib/projects"
import { cn } from "@/lib/utils"

/**
 * Miniatury kart projektów — stylizowane „okna przeglądarki" w proporcji 800/500,
 * których akcenty napędzane są zmienną `--project-accent`.
 *
 * Wszystkie obrazy w `public/images/` mają rozdzielczość 800x500 px.
 * Kontener miniatury zachowuje dokładną proporcję `aspect-[800/500]`,
 * dzięki czemu zrzuty ekranu aplikacji są widoczne w całości, bez obcinania.
 */

interface VisualProps {
  /** Obraz miniatury pobrany z definicji projektu w `lib/projects.ts`. */
  readonly image: ProjectImage
}

/** Górny pasek „okna przeglądarki" — spójny z motywem deweloperskim. */
function WindowChrome() {
  return (
    <div className='flex h-7 shrink-0 items-center gap-2 border-b border-white/10 bg-black/40 px-3 backdrop-blur-sm'>
      <span className='flex gap-1.5'>
        <span className='size-2 rounded-full bg-[#ff5f57]/80' />
        <span className='size-2 rounded-full bg-[#febc2e]/80' />
        <span className='size-2 rounded-full bg-[#28c840]/80' />
      </span>
      <span className='ml-1 h-2 flex-1 rounded-full bg-white/10' />
      <span className='h-2 w-8 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_35%,transparent)]' />
    </div>
  )
}

/** Renderowanie obrazu projektu w proporcji 800/500 bez obcinania kadru. */
function ProjectImageContainer({ image }: VisualProps) {
  return (
    <div className='relative h-full w-full'>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover object-center'
        loading='eager'
      />
    </div>
  )
}

const VISUALS: Record<ProjectVisual, (props: VisualProps) => ReactNode> = {
  dashboard: ProjectImageContainer,
  booking: ProjectImageContainer,
  shop: ProjectImageContainer,
  platform: ProjectImageContainer,
  "luxe-auto": ProjectImageContainer,
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
        "relative flex w-full flex-col overflow-hidden bg-[linear-gradient(160deg,color-mix(in_oklab,var(--project-accent)_12%,var(--surface-container-high))_0%,var(--surface-container-low)_70%)]",
        className,
      )}
    >
      {/* Siatka „deweloperska" w tle miniatury */}
      <span className='bg-grid pointer-events-none absolute inset-0 opacity-10' />
      <span className='pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_22%,transparent)] blur-2xl' />

      {/* Pasek przeglądarki WindowChrome */}
      <WindowChrome />

      {/* Obszar obrazu o precyzyjnej proporcji 800/500 */}
      <div className='relative aspect-800/500 w-full overflow-hidden bg-black/20'>
        <Visual image={project.image} />
      </div>
    </div>
  )
}
