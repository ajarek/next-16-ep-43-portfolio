"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SearchX, X } from "lucide-react";

import { ProjectGridCard } from "@/components/projects/project-grid-card";
import { buttonVariants } from "@/components/ui/button";
import {
  PROJECT_TAGS,
  filterProjects,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectsGridProps {
  /** Projekty pobrane z `lib/projects.ts` przez stronę serwerową. */
  readonly projects: readonly Project[];
}

/** Formatowanie liczby w stylu „01" (monospace w licznikach). */
function pad(count: number): string {
  return String(count).padStart(2, "0");
}

interface FilterChipProps {
  readonly label: string;
  readonly count: number;
  readonly active: boolean;
  readonly onClick: () => void;
}

/** Pigułka filtra technologii — z licznikiem i kropką aktywności. */
function FilterChip({ label, count, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95",
        active
          ? "border-primary/60 bg-primary/15 text-primary shadow-[0_0_20px_-6px_var(--primary)]"
          : "border-border/70 bg-background/40 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full bg-current transition-opacity duration-300",
          active ? "opacity-100 shadow-[0_0_8px_currentColor]" : "opacity-40"
        )}
      />
      {label}
      <span
        aria-hidden
        className={cn(
          "font-mono text-xs",
          active ? "text-primary/80" : "text-on-surface-variant/50"
        )}
      >
        {pad(count)}
      </span>
    </button>
  );
}

/**
 * Siatka wszystkich projektów (`/projekty`) z filtrowaniem:
 * wyszukiwarka tekstowa + chipy technologii. Logika filtrowania
 * mieszka w `lib/projects.ts` (`filterProjects`), komponent tylko
 * utrzymuje stan i renderuje wyniki.
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /** Technologie z licznikiem wystąpień — źródło chipów filtra. */
  const tags = useMemo(
    () =>
      PROJECT_TAGS.map((tag) => ({
        tag,
        count: projects.filter((project) => project.tags.includes(tag)).length,
      })),
    [projects]
  );

  const filtered = useMemo(
    () => filterProjects(projects, { query, tag: activeTag }),
    [projects, query, activeTag]
  );

  const hasFilters = query.trim() !== "" || activeTag !== null;

  /** Skrót klawiaturowy „/" — szybkie skupienie wyszukiwarki. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const clearFilters = () => {
    setQuery("");
    setActiveTag(null);
  };

  return (
    <section aria-label="Lista projektów" className="flex flex-col gap-6">
      {/* ——— Pasek filtrów (szkło wg DESIGN.md) ——— */}
      <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-surface-container-low/60 p-4 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full max-w-md">
            <span className="sr-only">Szukaj projektu</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/60"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Szukaj projektu… np. e-commerce"
              className="h-11 w-full rounded-full border border-border/70 bg-background/60 pl-11 pr-10 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent),0_0_24px_-8px_var(--primary)] [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Wyczyść wyszukiwanie"
                className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant transition-colors duration-300 outline-none hover:bg-white/5 hover:text-on-surface focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <X aria-hidden className="size-4" />
              </button>
            ) : (
              <kbd
                aria-hidden
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-border/70 bg-surface-container-high/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-on-surface-variant/60"
              >
                /
              </kbd>
            )}
          </label>

          <p className="font-mono text-xs tracking-[0.2em] text-on-surface-variant/60 sm:text-right">
            {pad(filtered.length)} / {pad(projects.length)}
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtruj po technologii"
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          <FilterChip
            label="Wszystkie"
            count={projects.length}
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {tags.map(({ tag, count }) => (
            <FilterChip
              key={tag}
              label={tag}
              count={count}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      </div>

      {/* ——— Siatka projektów ——— */}
      {/* Animacja wejścia tylko przy zmianie taga — wyszukiwanie tekstowe
          aktualizuje siatkę natychmiast, bez odtwarzania animacji na znak. */}
      {filtered.length > 0 ? (
        <div
          key={activeTag ?? "all"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "animate-in fade-in slide-in-from-bottom-3 fill-mode-both",
                index === 0 && "sm:col-span-2"
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <ProjectGridCard project={project} className="h-full" />
            </div>
          ))}
        </div>
      ) : (
        /* ——— Stan pusty ——— */
        <div className="animate-in fade-in flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/60 bg-surface-container-low/40 px-6 py-16 text-center backdrop-blur-xl">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_-6px_var(--primary)]">
            <SearchX aria-hidden className="size-6" />
          </span>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
              Brak wyników dla wybranych filtrów
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Spróbuj wpisać inną frazę lub wybrać inną technologię —
              wszystkie realizacje wciąż czekają.
            </p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className={cn(
                buttonVariants({ variant: "outline", size: "pill" }),
                "mt-1 px-4 text-sm text-on-surface-variant transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_-6px_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95"
              )}
            >
              <X aria-hidden className="size-4" />
              Wyczyść filtry
            </button>
          )}
        </div>
      )}
    </section>
  );
}
