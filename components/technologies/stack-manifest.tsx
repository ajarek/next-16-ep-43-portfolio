import Image from "next/image";

import { StackCode } from "@/components/technologies/stack-code";
import { ENGINEERING } from "@/lib/engineering";
import {
  TECHNOLOGIES_PAGE,
  TECHNOLOGY_LAYERS,
} from "@/lib/technologies";

/**
 * Manifest stosu — dwukolumnowa kompozycja: wizualizacja skill-hub
 * i warstwy systemu po lewej, filozofia oraz okno kodu po prawej.
 */
export function StackManifest() {
  return (
    <section
      aria-labelledby="stack-manifest-heading"
      className="grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8"
    >
      <div className="flex flex-col gap-4">
        <div className="relative mx-auto w-full max-w-124">
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
                  loading="eager"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover/visual:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="bg-grid pointer-events-none absolute inset-0 opacity-15"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_38%)] opacity-0 transition-opacity duration-700 group-hover/visual:opacity-100"
                />
              </div>
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-4 rounded-full border border-primary/25 bg-background/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.18em] text-primary backdrop-blur"
            >
              6 WARSTW
            </span>
          </div>
        </div>

        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TECHNOLOGY_LAYERS.map((layer) => (
            <li
              key={layer.id}
              className="rounded-2xl border border-border/60 bg-surface-container-low/70 px-3 py-3 backdrop-blur-xl"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-primary">
                {layer.index}
              </p>
              <p className="mt-1 text-sm font-medium tracking-[-0.01em] text-foreground">
                {layer.title}
              </p>
              <p className="mt-0.5 text-[0.68rem] text-on-surface-variant/70">
                {layer.kicker}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <h2
            id="stack-manifest-heading"
            className="text-headline-md font-semibold tracking-[-0.02em] text-foreground"
          >
            Inżynieria spotyka{" "}
            <span className="text-[#b19bf4]">design</span>
          </h2>
          {TECHNOLOGIES_PAGE.manifesto.map((paragraph) => (
            <p key={paragraph} className="text-body-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <StackCode />

        <p className="font-mono text-[0.65rem] tracking-[0.16em] text-on-surface-variant/50">
          {TECHNOLOGIES_PAGE.codeCaption}
        </p>
      </div>
    </section>
  );
}
