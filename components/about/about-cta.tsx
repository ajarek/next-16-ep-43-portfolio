import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type AboutCta as AboutCtaType } from "@/lib/about"

interface AboutCtaProps {
  readonly cta: AboutCtaType
}

/**
 * Zwieńczenie strony O mnie — szklana karta Call-To-Action z gradientowymi poświatami.
 */
export function AboutCta({ cta }: AboutCtaProps) {
  return (
    <section
      aria-labelledby='about-cta-heading'
      className='relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-low/75 px-6 py-10 backdrop-blur-xl sm:px-10'
    >
      {/* Dynamiczne poświaty świetlne */}
      <span
        aria-hidden
        className='pointer-events-none absolute -left-16 top-0 size-56 rounded-full bg-primary/15 blur-3xl'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute -right-10 bottom-0 size-48 rounded-full bg-cyan-400/10 blur-3xl'
      />

      <div className='relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
        <div className='max-w-xl space-y-3'>
          <span className='text-label inline-flex items-center gap-2 text-primary'>
            <span className='size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]' />
            {cta.overline}
          </span>
          <h2
            id='about-cta-heading'
            className='text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl lg:text-4xl'
          >
            {cta.heading}
          </h2>
          <p className='text-body-md text-muted-foreground'>
            {cta.description}
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <Link
            href={cta.primaryHref}
            className={cn(
              buttonVariants({ variant: "gradient", size: "pill" }),
              "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
            )}
          >
            {cta.primaryLabel}
            <Mail aria-hidden className='size-4' />
          </Link>
          <Link
            href={cta.secondaryHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "pill" }),
              "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
            )}
          >
            {cta.secondaryLabel}
            <ArrowUpRight aria-hidden className='size-4' />
          </Link>
        </div>
      </div>
    </section>
  )
}
