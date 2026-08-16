import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type AboutManifesto as AboutManifestoType,
  type DeveloperProfileData,
} from "@/lib/about";
import { AboutCodeBlock } from "./about-code-block";

interface AboutManifestoProps {
  readonly manifesto: AboutManifestoType;
  readonly developerProfile: DeveloperProfileData;
}

/**
 * Sekcja manifestu i profilu deweloperskiego.
 * Prezentuje filozofię tworzenia oprogramowania oraz interaktywny obiekt konfiguracji.
 */
export function AboutManifesto({
  manifesto,
  developerProfile,
}: AboutManifestoProps) {
  return (
    <section
      aria-labelledby="about-manifesto-heading"
      className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
    >
      {/* Kolumna lewa — treść i manifest */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-primary">
          <Sparkles className="size-3.5" />
          {manifesto.subtitle}
        </div>

        <h2
          id="about-manifesto-heading"
          className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {manifesto.title}
        </h2>

        <div className="space-y-4 text-body-lg text-muted-foreground">
          {manifesto.paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "gradient", size: "pill" }),
              "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
            )}
          >
            Skontaktuj się
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="/technologies"
            className={cn(
              buttonVariants({ variant: "outline", size: "pill" }),
              "h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]",
            )}
          >
            Zobacz technologie
          </Link>
        </div>
      </div>

      {/* Kolumna prawa — okno terminala z kodem profilu */}
      <div className="relative mx-auto w-full max-w-xl">
        {/* Poświata za oknem */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_70%)] blur-2xl"
        />
        <AboutCodeBlock profile={developerProfile} />
      </div>
    </section>
  );
}
