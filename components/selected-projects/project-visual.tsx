import type { ReactNode } from "react";

import type { Project, ProjectVisual } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Miniatury kart generowane w całości w CSS (bez obrazków).
 * Każdy wariant to stylizowany „mockup" interfejsu, którego akcenty
 * napędzane są zmienną `--project-accent` ustawianą przez kartę projektu.
 */

/** Górny pasek „okna przeglądarki" — spójny z motywem developerskim. */
function WindowChrome() {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-white/5 bg-black/25 px-3">
      <span className="flex gap-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2 rounded-full bg-[#febc2e]/80" />
        <span className="size-2 rounded-full bg-[#28c840]/80" />
      </span>
      <span className="ml-1 h-2.5 flex-1 rounded-full bg-white/[0.06]" />
      <span className="h-2.5 w-10 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_25%,transparent)]" />
    </div>
  );
}

/** Wykres słupkowy + linia trendu (AI Dashboard). */
function DashboardVisual() {
  const bars = [34, 52, 40, 68, 55, 82, 61];

  return (
    <div className="relative flex h-full flex-col">
      <div className="relative flex flex-1 items-end gap-1.5 px-4 pb-3 pt-2">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-t-sm bg-[color-mix(in_oklab,var(--project-accent)_26%,transparent)] transition-colors duration-300 last:bg-[color-mix(in_oklab,var(--project-accent)_55%,transparent)]"
          />
        ))}
        <svg
          aria-hidden
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-4 bottom-6 h-14 opacity-70"
        >
          <polyline
            points="0,44 28,36 56,40 84,22 112,28 140,10 168,16 200,6"
            fill="none"
            stroke="var(--project-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px var(--project-accent))" }}
          />
        </svg>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
        <span className="rounded-full bg-[color-mix(in_oklab,var(--project-accent)_18%,transparent)] px-2 py-0.5 font-mono text-[0.6rem] text-[color-mix(in_oklab,var(--project-accent)_70%,white)]">
          +38% trend
        </span>
        <span className="font-mono text-[0.6rem] text-on-surface-variant/50">
          live
        </span>
      </div>
    </div>
  );
}

/** Siatka kalendarza z zaznaczonymi terminami (Booking Villas). */
function BookingVisual() {
  const cells = Array.from({ length: 35 });
  const booked = new Set([6, 7, 8, 13, 14, 19, 20, 26]);

  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.65rem] font-medium text-on-surface-variant">
          Lipiec 2026
        </span>
        <span className="flex gap-1">
          <span className="size-3.5 rounded bg-[color-mix(in_oklab,var(--project-accent)_55%,transparent)]" />
          <span className="size-3.5 rounded bg-white/[0.07]" />
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((_, index) => {
          const isBooked = booked.has(index);
          return (
            <span
              key={index}
              className={cn(
                "aspect-square rounded-[0.3rem] bg-white/[0.05]",
                isBooked &&
                  "bg-[color-mix(in_oklab,var(--project-accent)_45%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--project-accent)_60%,transparent)]"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Siatka produktów (E-commerce Premium). */
function ShopVisual() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5 p-3">
      {[0, 1, 2, 3, 4, 5].map((tile) => (
        <div
          key={tile}
          className="relative flex flex-col justify-end overflow-hidden rounded-md border border-white/5 bg-white/[0.04] p-1.5"
        >
          <span className="mb-1 block h-5 rounded-sm bg-[color-mix(in_oklab,var(--project-accent)_14%,transparent)]" />
          <span className="mb-1 block h-1 w-3/4 rounded-full bg-white/[0.08]" />
          <span className="block h-1 w-1/2 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_35%,transparent)]" />
          {tile === 0 && (
            <span className="absolute right-1 top-1 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_75%,black)] px-1 text-[0.5rem] font-semibold leading-3 text-white">
              −20%
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Lista zamówień z paskami postępu (Premium Platforma). */
function PlatformVisual() {
  const orders = [
    { id: "#2041", label: "Zamówienie", progress: 100 },
    { id: "#2042", label: "Płatność", progress: 64 },
    { id: "#2043", label: "Wysyłka", progress: 28 },
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-2 px-4 py-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[0.62rem] text-on-surface-variant/70">
              {order.id}
            </span>
            <span className="text-[0.6rem] text-on-surface-variant/50">
              {order.label}
            </span>
            <span className="font-mono text-[0.62rem] text-[color-mix(in_oklab,var(--project-accent)_75%,white)]">
              {order.progress}%
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <span
              style={{ width: `${order.progress}%` }}
              className="block h-full rounded-full bg-[color-mix(in_oklab,var(--project-accent)_60%,transparent)] shadow-[0_0_8px_var(--project-accent)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<ProjectVisual, () => ReactNode> = {
  dashboard: DashboardVisual,
  booking: BookingVisual,
  shop: ShopVisual,
  platform: PlatformVisual,
};

interface ProjectVisualProps {
  readonly project: Project;
  readonly className?: string;
}

export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const Visual = VISUALS[project.visual];

  return (
    <div
      aria-hidden
      className={cn(
        "relative h-40 shrink-0 overflow-hidden bg-[linear-gradient(160deg,color-mix(in_oklab,var(--project-accent)_12%,var(--surface-container-high))_0%,var(--surface-container-low)_70%)]",
        className
      )}
    >
      {/* Siatka „developerska" w tle miniatury. */}
      <span className="bg-grid pointer-events-none absolute inset-0 opacity-10" />
      <span className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_22%,transparent)] blur-2xl" />

      <div className="absolute inset-0">
        <Visual />
      </div>

      <WindowChrome />
    </div>
  );
}
