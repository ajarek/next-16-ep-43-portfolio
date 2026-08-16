import { Code2, Cpu, Flame } from "lucide-react";
import { type AboutPassion } from "@/lib/about";

interface AboutPassionsProps {
  readonly passions: readonly AboutPassion[];
}

const PASSION_ICONS = [Flame, Cpu, Code2];

/**
 * Sekcja zainteresowań i technologii eksperymentalnych (Beyond the code).
 */
export function AboutPassions({ passions }: AboutPassionsProps) {
  return (
    <section aria-labelledby="about-passions-heading" className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-label text-primary">Poza kodem &amp; R&amp;D</span>
        <h2
          id="about-passions-heading"
          className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
        >
          Eksperymenty i ciągła ciekawość
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {passions.map((passion, index) => {
          const Icon = PASSION_ICONS[index % PASSION_ICONS.length];

          return (
            <div
              key={passion.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-surface-container/80"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-border/60 bg-background/50 p-2 text-primary transition-colors group-hover:border-primary/40 group-hover:text-foreground">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                  {passion.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {passion.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
