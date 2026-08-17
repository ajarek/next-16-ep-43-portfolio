import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CSSProperties } from "react"

import { ProjectVisual } from "@/components/selected-projects/project-visual"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  readonly project: Project
  /** Wymuszony styl transformacji — pozycja w wachlarzu. */
  readonly style?: CSSProperties
  /** Czy karta jest aktualnie aktywna (przód wachlarza). */
  readonly active?: boolean
  readonly className?: string
}

/**
 * Pojedyncza karta projektu — szklana tafla z miniaturą, technologiami
 * i CTA (DESIGN.md → „Glass Cards" + „Project Chips").
 * Kolor akcentu projektu trafia do zmiennej `--project-accent`, z której
 * korzystają poświaty, chipy i miniatura.
 */
export function ProjectCard({
  project,
  style,
  active = false,
  className,
}: ProjectCardProps) {
  return (
    <article
      style={
        {
          "--project-accent": project.accent,
          ...style,
        } as CSSProperties
      }
      data-active={active}
      className={cn(
        "group/card relative flex w-[16rem] cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/85 text-left backdrop-blur-xl transition-all duration-500 ease-out select-none sm:w-[18rem] lg:w-76 p-3",
        "shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]",
        "hover:border-[color-mix(in_oklab,var(--project-accent)_70%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--project-accent)_45%,transparent),0_40px_90px_-32px_color-mix(in_oklab,var(--project-accent)_80%,transparent)]",
        className,
      )}
    >
      {/* Poświata w tle karty — wyłania się przy hoverze. */}
      <span
        aria-hidden
        className='pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--project-accent)_28%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100'
      />

      <ProjectVisual project={project} />

      <div className='relative flex flex-1 flex-col gap-2.5 p-4 sm:p-5'>
        <div className='flex items-center justify-between gap-2'>
          <span className='font-mono text-[0.7rem] tracking-[0.08em] text-on-surface-variant/60'>
            /{project.index}
          </span>
          <span className='flex gap-1'>
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-[color-mix(in_oklab,var(--project-accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--project-accent)_12%,transparent)] px-2 py-0.5 text-[0.62rem] font-medium text-[color-mix(in_oklab,var(--project-accent)_75%,white)]'
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className='rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.62rem] text-on-surface-variant/70'>
                +{project.tags.length - 2}
              </span>
            )}
          </span>
        </div>

        <h3 className='text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl'>
          {project.title}
        </h3>
        <p className='text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm'>
          {project.description}
        </p>

        <div className='mt-auto flex items-center justify-between gap-2 pt-2'>
          <Link
            href={project.cta.href}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(event) => event.stopPropagation()}
            className='group/link inline-flex items-center gap-1 text-sm font-medium text-[color-mix(in_oklab,var(--project-accent)_85%,white)] outline-none transition-colors duration-300 hover:text-[color-mix(in_oklab,var(--project-accent)_60%,white)] focus-visible:ring-3 focus-visible:ring-ring/50'
          >
            {project.cta.label}
            <ArrowUpRight
              aria-hidden
              className='size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
