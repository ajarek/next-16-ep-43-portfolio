import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { ProjectVisual } from "@/components/selected-projects/project-visual";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectGridCardProps {
  readonly project: Project;
  readonly className?: string;
}

/**
 * Karta projektu na stronie `/projekty` — cała tafla jest odnośnikiem
 * do aplikacji (DESIGN.md → „Glass Cards"), a kolor akcentu trafia
 * do zmiennej `--project-accent`, z której korzysta miniatura i poświaty.
 */
export function ProjectGridCard({ project, className }: ProjectGridCardProps) {
  return (
    <Link
      href={project.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.cta.label}`}
      style={
        {
          "--project-accent": project.accent,
        } as CSSProperties
      }
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/85 text-left backdrop-blur-xl transition-all duration-500 ease-out",
        "shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]",
        "hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--project-accent)_70%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--project-accent)_45%,transparent),0_40px_90px_-32px_color-mix(in_oklab,var(--project-accent)_80%,transparent)]",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      {/* Poświata w tle karty — wyłania się przy hoverze. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--project-accent)_28%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />

      {/* Numer porządkowy — subtelny znak wodny pod paskiem okna miniatury. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-10 z-10 font-mono text-xs tracking-[0.2em] text-on-surface-variant/70"
      >
        /{project.index}
      </span>

      <ProjectVisual
        project={project}
        className="transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
      />

      <div className="relative flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <span className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color-mix(in_oklab,var(--project-accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--project-accent)_12%,transparent)] px-2 py-0.5 text-[0.62rem] font-medium text-[color-mix(in_oklab,var(--project-accent)_75%,white)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.62rem] text-on-surface-variant/70">
              +{project.tags.length - 3}
            </span>
          )}
        </span>

        <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
          {project.title}
        </h2>
        <p className="line-clamp-3 text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
          {project.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="group/link inline-flex items-center gap-1 text-sm font-medium text-[color-mix(in_oklab,var(--project-accent)_85%,white)]">
            {project.cta.label}
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            />
          </span>
        </div>
      </div>

      {/* Linia akcentu na dole karty — rozwija się przy hoverze. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 origin-left scale-x-0 bg-[color-mix(in_oklab,var(--project-accent)_80%,white)] transition-transform duration-500 ease-out group-hover/card:scale-x-100"
      />
    </Link>
  );
}
