import { GitCommit } from "lucide-react"
import { type AboutMilestone } from "@/lib/about"

interface AboutTimelineProps {
  readonly milestones: readonly AboutMilestone[]
}

/**
 * Sekcja ewolucji i kamieni milowych dewelopera w układzie osi czasu.
 */
export function AboutTimeline({ milestones }: AboutTimelineProps) {
  return (
    <section aria-labelledby='about-timeline-heading' className='space-y-8'>
      <div className='flex flex-col gap-2'>
        <span className='text-label text-primary'>Ewolucja &amp; Ścieżka</span>
        <h2
          id='about-timeline-heading'
          className='text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl'
        >
          Etapy rozwoju i zdobywania doświadczenia
        </h2>
        <p className='max-w-2xl text-body-md text-muted-foreground'>
          Ciągły rozwój technologiczny i poszerzanie kompetencji od fundamentów
          po zaawansowane systemy Full-Stack.
        </p>
      </div>

      <div className='relative border-l border-border/80 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-8'>
        {milestones.map((milestone) => (
          <div
            key={milestone.period}
            className='group relative flex flex-col gap-2 rounded-[1.5rem] border border-border/70 bg-surface-container-low/70 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-surface-container/70'
          >
            {/* Wskaźnik punktu na osi czasu */}
            <div className='absolute -left-11 sm:-left-13 top-6 flex size-6 items-center justify-center rounded-full border border-primary/50 bg-surface-container-lowest text-primary shadow-[0_0_12px_var(--primary)] transition-transform duration-300 group-hover:scale-110'>
              <GitCommit className='size-3.5' />
            </div>

            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
                {milestone.period}
              </span>
              <span className='rounded-full border border-border/60 bg-background/50 px-2.5 py-0.5 font-mono text-[0.68rem] text-on-surface-variant'>
                {milestone.scope}
              </span>
            </div>

            <h3 className='text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl'>
              {milestone.role}
            </h3>

            <p className='text-sm leading-relaxed text-muted-foreground sm:text-base'>
              {milestone.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
