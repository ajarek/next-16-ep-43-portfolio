import Link from "next/link"
import { ArrowUpRight, Mail, Sparkles, Zap, Layers } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  type AboutPageHeader,
  type AboutStat,
  type AboutVideoData,
} from "@/lib/about"
import { AboutVideo } from "./about-video"

interface AboutHeroProps {
  readonly page: AboutPageHeader
  readonly stats: readonly AboutStat[]
  readonly video: AboutVideoData
}

const HIGHLIGHT_ICONS = [Sparkles, Zap, Layers]

/**
 * Sekcja Hero na początku strony „O mnie”.
 * Spójna architektonicznie z HeroSection strony głównej:
 * - Lewa kolumna: nagłówki, opis, przyciski CTA oraz metadane statusu
 * - Prawa kolumna: interaktywny odtwarzacz wideo 16/9
 * - Dolny rząd: 3 karty cech warsztatu inżynierskiego
 */
export function AboutHero({ page, stats, video }: AboutHeroProps) {
  return (
    <section id='o-mnie-hero' className='space-y-10 py-2 sm:py-4'>
      <div className='relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14'>
        {/* Lewa kolumna: teksty nagłówkowe i przyciski akcji */}
        <div className='max-w-2xl space-y-6'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            <span className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-primary'>
              <span className='size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]' />
              {page.overline}
            </span>
            <span className='font-mono text-xs tracking-[0.2em] text-on-surface-variant/60'>
              {page.path}
            </span>
          </div>

          <div className='space-y-4'>
            <h1 className='text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl'>
              {page.heading}{" "}
              <span className='text-primary'>{page.headingAccent}</span>
            </h1>
            <p className='max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {page.description}
            </p>
          </div>

          {/* Przyciski akcji w stylu strony głównej */}
          <div className='flex flex-wrap gap-3 pt-1'>
            <Link
              href='/contact'
              className={cn(
                buttonVariants({ size: "lg", variant: "gradient" }),
                "h-12 px-6 text-sm font-semibold uppercase tracking-[0.12em]"
              )}
            >
              Skontaktuj się
              <Mail className='size-4' />
            </Link>
            <Link
              href='/projects'
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 px-6 text-sm font-semibold uppercase tracking-[0.12em]"
              )}
            >
              Zobacz projekty
              <ArrowUpRight className='size-4' />
            </Link>
            <a
              href='#about-manifesto-heading'
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "h-12 px-5 text-sm font-semibold uppercase tracking-[0.12em] border border-border/60 hover:border-primary/40"
              )}
            >
              Manifest inżynierski
            </a>
          </div>

          {/* Wskaźniki statusu i lokalizacji w pigułkach */}
          <dl className='flex flex-wrap items-center gap-2.5 pt-2 font-mono text-xs text-muted-foreground'>
            {stats.map((stat, index) => {
              const dotColors = [
                "bg-tertiary shadow-[0_0_10px_var(--tertiary)]",
                "bg-primary shadow-[0_0_10px_var(--primary)]",
                "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
              ]
              const dotColor = dotColors[index % dotColors.length]

              return (
                <div
                  key={stat.label}
                  className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3.5 py-1.5 backdrop-blur'
                >
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
        </div>

        {/* Prawa kolumna: interaktywny odtwarzacz wideo 16/9 */}
        <div className='relative mx-auto w-full max-w-2xl lg:max-w-none'>
          <AboutVideo src={video.videoSrc} />
        </div>
      </div>

      {/* Dolny rząd: 3 karty cech warsztatu inżynierskiego (Bento highlights) */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {video.highlights.map((item, index) => {
          const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length]

          return (
            <div
              key={item.title}
              className='group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-surface-container/80'
            >
              {/* Efekt poświaty w tle karty */}
              <span
                aria-hidden
                className='pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100'
              />

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='rounded-xl border border-border/60 bg-background/50 p-2 text-primary transition-colors group-hover:border-primary/40 group-hover:text-foreground'>
                    <Icon className='size-4' />
                  </div>
                  <span className='inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-primary'>
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className='text-base font-semibold tracking-[-0.02em] text-foreground'>
                    {item.title}
                  </h3>
                  <p className='mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm'>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
