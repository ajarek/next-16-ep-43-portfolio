import { Layers, Zap, ShieldCheck, Target } from "lucide-react";
import { type AboutValue } from "@/lib/about";

interface AboutValuesProps {
  readonly values: readonly AboutValue[];
}

const VALUE_ICONS = [
  Layers,
  Zap,
  ShieldCheck,
  Target,
];

/**
 * Sekcja filarów inżynierii i wartości dewelopera w układzie Bento Grid.
 */
export function AboutValues({ values }: AboutValuesProps) {
  return (
    <section aria-labelledby="about-values-heading" className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-label text-primary">Standardy &amp; Filary</span>
        <h2
          id="about-values-heading"
          className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
        >
          Wartości, które definiują mój kod
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = VALUE_ICONS[index % VALUE_ICONS.length];

          return (
            <div
              key={value.index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-surface-container/80"
            >
              {/* Efekt poświaty w tle karty */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-primary">
                    {value.index}
                  </span>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-2 text-primary transition-colors group-hover:border-primary/40 group-hover:text-foreground">
                    <Icon className="size-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-primary">
                  {value.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
