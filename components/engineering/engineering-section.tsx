import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ENGINEERING } from "@/lib/engineering";
import { cn } from "@/lib/utils";

/**
 * Sekcja „Engineering" — dwukolumnowa kompozycja wg wzorca
 * `public/patterns/engineering.png`:
 * - po lewej graficzna wizualizacja stosu technologicznego
 *   (`public/images/skill-hub.png`) w szklanej ramie z poświatą,
 * - po prawej nagłówek, opis podejścia do pracy, chipy technologii
 *   i przycisk CTA „POBIERZ CV".
 *
 * Sekcja jest przezroczysta — spoczywa na jednolitym gradiencie strony.
 */
export function EngineeringSection() {
  return (
    <section
      id="technologie"
      className="relative isolate scroll-mt-24 py-10 lg:py-14"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* ——— Wizualizacja stosu technologicznego ——— */}
        <div className="relative mx-auto w-full max-w-124">
          {/* Poświata za ramą — echo „glow borders" z DESIGN.md. */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_45%,color-mix(in_oklab,var(--primary)_24%,transparent),transparent_72%)] blur-2xl"
          />

          <div className="group/visual relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-low/80 p-3 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_30px_90px_-32px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-border/60 bg-background/70 p-2">
              <div className="relative overflow-hidden rounded-[1.15rem]">
                <Image
                  src={ENGINEERING.image.src}
                  alt={ENGINEERING.image.alt}
                  width={ENGINEERING.image.width}
                  height={ENGINEERING.image.height}
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover/visual:scale-[1.04]"
                />
                {/* Siatka „developerska" na grafice — spójna z tłem strony. */}
                <div
                  aria-hidden
                  className="bg-grid pointer-events-none absolute inset-0 opacity-15"
                />
                {/* Płynne rozjaśnienie od góry — efekt „light". */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_38%)] opacity-0 transition-opacity duration-700 group-hover/visual:opacity-100"
                />
              </div>
            </div>

            {/* Pływający znacznik w rogu ramy. */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-4 rounded-full border border-primary/25 bg-background/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.18em] text-primary backdrop-blur"
            >
              FULL-STACK
            </span>
          </div>
        </div>

        {/* ——— Treść ——— */}
        <div className="max-w-2xl space-y-6">
          <span className="text-label inline-flex items-center gap-2 text-primary">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            {ENGINEERING.overline}
          </span>

          <h2 className="text-headline-lg-responsive text-foreground">
            {ENGINEERING.headingLine1}{" "}
            <span className="text-[#b19bf4]">{ENGINEERING.headingAccent}</span>
          </h2>

          <div className="space-y-4 text-body-lg text-muted-foreground">
            {ENGINEERING.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Chipy technologii — „Project Chips" z DESIGN.md, z kolorami logotypów. */}
          <ul className="flex flex-wrap gap-2">
            {ENGINEERING.technologies.map((technology) => (
              <li
                key={technology.name}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.1em] text-on-surface-variant backdrop-blur transition-colors duration-300 hover:border-primary/40 hover:text-on-surface"
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{
                    backgroundColor: technology.accent,
                    boxShadow: `0 0 8px ${technology.accent}`,
                  }}
                />
                {technology.name}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link
              href={ENGINEERING.cta.href}
              className={cn(
                buttonVariants({ variant: "gradient", size: "pill" }),
                "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]"
              )}
            >
              {ENGINEERING.cta.label}
              <Download aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
