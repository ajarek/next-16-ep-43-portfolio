import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Blend,
  Braces,
  Cable,
  Component,
  CreditCard,
  Database,
  DatabaseZap,
  Flame,
  Hexagon,
  PanelsTopLeft,
  Server,
  ShieldCheck,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";

import {
  getTechnologyLayer,
  type Technology,
  type TechnologyIconId,
} from "@/lib/technologies";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const TECHNOLOGY_ICONS: Record<TechnologyIconId, LucideIcon> = {
  component: Component,
  hexagon: Hexagon,
  braces: Braces,
  wind: Wind,
  server: Server,
  database: Database,
  flame: Flame,
  "database-zap": DatabaseZap,
  cable: Cable,
  "credit-card": CreditCard,
  sparkles: Sparkles,
  panels: PanelsTopLeft,
  shield: ShieldCheck,
  blend: Blend,
};

interface TechnologyCardProps {
  readonly technology: Technology;
  readonly projects: readonly Project[];
  readonly className?: string;
}

/**
 * Szklana karta narzędzia — akcent logotypu napędza poświatę
 * (DESIGN.md → „Glass Cards" + chipy technologii).
 */
export function TechnologyCard({
  technology,
  projects,
  className,
}: TechnologyCardProps) {
  const Icon = TECHNOLOGY_ICONS[technology.icon];
  const layer = getTechnologyLayer(technology.layer);
  const related = projects.filter((project) =>
    technology.usedIn.includes(project.id),
  );

  return (
    <article
      style={
        {
          "--tech-accent": technology.accent,
        } as CSSProperties
      }
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/85 p-5 backdrop-blur-xl transition-all duration-500 ease-out",
        "shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]",
        "hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--tech-accent)_55%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--tech-accent)_35%,transparent),0_40px_90px_-32px_color-mix(in_oklab,var(--tech-accent)_55%,transparent)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--tech-accent)_28%,transparent),transparent_70%)] opacity-40 transition-opacity duration-500 group-hover/card:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--tech-accent)_28%,transparent)] bg-[color-mix(in_oklab,var(--tech-accent)_12%,transparent)] text-[var(--tech-accent)]">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="rounded-full border border-border/60 bg-background/50 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.16em] text-on-surface-variant/70">
          {layer.index} {layer.title}
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        <span
          aria-hidden
          className="size-1.5 rounded-full"
          style={{
            backgroundColor: technology.accent,
            boxShadow: `0 0 8px ${technology.accent}`,
          }}
        />
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
          {technology.name}
        </h3>
      </div>

      <p className="relative mt-1.5 text-sm font-medium text-on-surface-variant">
        {technology.role}
      </p>
      <p className="relative mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
        {technology.description}
      </p>

      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-4">
        {technology.inPortfolio ? (
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[0.62rem] font-medium tracking-[0.06em] text-primary">
            to portfolio
          </span>
        ) : null}
        {related.map((project) => (
          <Link
            key={project.id}
            href={project.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.62rem] text-on-surface-variant/80 transition-colors duration-300 hover:border-primary/40 hover:text-primary"
          >
            {project.title}
          </Link>
        ))}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[color-mix(in_oklab,var(--tech-accent)_80%,white)] transition-transform duration-500 ease-out group-hover/card:scale-x-100"
      />
    </article>
  );
}
