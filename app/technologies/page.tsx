import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { ContactSpotlight } from "@/components/contact/contact-spotlight";
import { StackManifest } from "@/components/technologies/stack-manifest";
import { TechnologiesExplorer } from "@/components/technologies/technologies-explorer";
import { buttonVariants } from "@/components/ui/button";
import { PROJECTS } from "@/lib/projects";
import {
  TECHNOLOGIES,
  TECHNOLOGIES_PAGE,
  TECHNOLOGY_LAYERS,
  countLinkedProjects,
} from "@/lib/technologies";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Technologie",
  description:
    "Stos AJAREK DEV — warstwy od fasady Next.js po pamięć Prisma i przepływ Stripe. Kod, którego użytkownik nigdy nie zauważa.",
};

/**
 * Strona `/technologies` — pełny kontekst stosu.
 * Dane z `lib/technologies.ts`; interakcję filtrów obsługuje eksplorator.
 */
export default function TechnologiesPage() {
  const { cta } = TECHNOLOGIES_PAGE;
  const linkedProjects = countLinkedProjects(TECHNOLOGIES);

  return (
    <div
      id="technologie"
      className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-10 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <ContactSpotlight />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 pb-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-label inline-flex items-center gap-2 text-primary">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                {TECHNOLOGIES_PAGE.overline}
              </span>
              <span className="font-mono text-xs tracking-[0.2em] text-on-surface-variant/60">
                {TECHNOLOGIES_PAGE.path}
              </span>
            </div>
            <h1 className="text-headline-lg-responsive text-foreground">
              {TECHNOLOGIES_PAGE.heading}{" "}
              <span className="text-primary">
                {TECHNOLOGIES_PAGE.headingAccent}
              </span>
            </h1>
            <p className="max-w-xl text-body-lg text-muted-foreground">
              {TECHNOLOGIES_PAGE.description}
            </p>
          </div>

          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm tracking-[0.15em] text-on-surface-variant/70">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex size-2 rounded-full bg-tertiary shadow-[0_0_10px_var(--tertiary)]"
              />
              <dt className="sr-only">Narzędzia</dt>
              <dd>
                {String(TECHNOLOGIES.length).padStart(2, "0")} narzędzi
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex size-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
              />
              <dt className="sr-only">Warstwy</dt>
              <dd>
                {String(TECHNOLOGY_LAYERS.length).padStart(2, "0")} warstw
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex size-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
              />
              <dt className="sr-only">Realizacje</dt>
              <dd>{String(linkedProjects).padStart(2, "0")} realizacji</dd>
            </div>
          </dl>
        </header>

        <StackManifest />

        <TechnologiesExplorer
          technologies={TECHNOLOGIES}
          projects={PROJECTS}
        />

        <section
          aria-labelledby="stack-principles-heading"
          className="flex flex-col gap-6"
        >
          <h2
            id="stack-principles-heading"
            className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl"
          >
            {TECHNOLOGIES_PAGE.principlesHeading}
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {TECHNOLOGIES_PAGE.principles.map((principle) => (
              <li
                key={principle.index}
                className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-5 backdrop-blur-xl"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-primary/8 blur-3xl"
                />
                <p className="font-mono text-xs tracking-[0.18em] text-primary">
                  {principle.index}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="stack-cta-heading"
          className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-low/75 px-6 py-8 backdrop-blur-xl sm:px-8"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 top-0 size-48 rounded-full bg-primary/12 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 bottom-0 size-40 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-3">
              <span className="text-label inline-flex items-center gap-2 text-primary">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                {cta.overline}
              </span>
              <h2
                id="stack-cta-heading"
                className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
              >
                {cta.heading}
              </h2>
              <p className="text-body-md text-muted-foreground">
                {cta.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={cta.primaryHref}
                className={cn(
                  buttonVariants({ variant: "gradient", size: "pill" }),
                  "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
                )}
              >
                {cta.primaryLabel}
                <Mail aria-hidden className="size-4" />
              </Link>
              <Link
                href={cta.secondaryHref}
                className={cn(
                  buttonVariants({ variant: "outline", size: "pill" }),
                  "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
                )}
              >
                {cta.secondaryLabel}
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
