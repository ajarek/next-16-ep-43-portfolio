import type { ReactNode } from "react"

import type { Project, ProjectVisual } from "@/lib/projects"
import { cn } from "@/lib/utils"
import Image from "next/image"

/**
 * Miniatury kart generowane w całości w CSS (bez obrazków).
 * Każdy wariant to stylizowany „mockup" interfejsu, którego akcenty
 * napędzane są zmienną `--project-accent` ustawianą przez kartę projektu.
 */

/** Górny pasek „okna przeglądarki" — spójny z motywem developerskim. */
function WindowChrome() {
  return (
    <div className='flex h-8 items-center gap-2 border-b border-white/5 bg-black/25 px-3'>
      <span className='flex gap-1.5'>
        <span className='size-2 rounded-full bg-[#ff5f57]/80' />
        <span className='size-2 rounded-full bg-[#febc2e]/80' />
        <span className='size-2 rounded-full bg-[#28c840]/80' />
      </span>
      <span className='ml-1 h-2.5 flex-1 rounded-full bg-white/6]' />
      <span className='h-2.5 w-10 rounded-full bg-[color-mix(in_oklab,var(--project-accent)_25%,transparent)]' />
    </div>
  )
}

/** Miniatura projektu AI Shop - Steck Butik */
function DashboardVisual() {
  return (
    <div className='relative flex h-full flex-col'>
      <Image
        src='/images/steck.jpg'
        alt='Steck Butik'
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover object-top'
      />
    </div>
  )
}

/** Siatka kalendarza z zaznaczonymi terminami (Booking Villas). */
function BookingVisual() {
  return (
    <div className='flex h-full flex-col px-4 pb-3 pt-2'>
      <Image
        src='/images/glamping.jpg'
        alt='Glamping'
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover object-top'
      />
    </div>
  )
}

/** Siatka produktów (E-commerce Premium). */
function ShopVisual() {
  return (
    <div className='grid h-full grid-cols-3 grid-rows-2 gap-1.5 p-3'>
      <Image
        src='/images/jeans.jpg'
        alt='E-commerce Premium'
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover object-top'
      />
    </div>
  )
}

/** Lista zamówień z paskami postępu (Premium Platforma). */
function PlatformVisual() {
  return (
    <div className='flex h-full flex-col justify-center gap-2 px-4 py-2'>
      <Image
        src='/images/babcia-gotuje.jpg'
        alt='Babcia Gotuje'
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover object-top'
      />
    </div>
  )
}

function LuxeAuto() {
  return (
    <div className='flex h-full flex-col justify-center gap-2 px-4 py-2'>
      <Image
        src='/images/luxe-auto.jpg'
        alt='Luxe Auto'
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='object-cover object-top'
      />
    </div>
  )
}

const VISUALS: Record<ProjectVisual, () => ReactNode> = {
  dashboard: DashboardVisual,
  booking: BookingVisual,
  shop: ShopVisual,
  platform: PlatformVisual,
  "luxe-auto": LuxeAuto,
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
        <Visual />
      </div>

      <WindowChrome />
    </div>
  )
}
