import { type AboutWorkflowStep } from "@/lib/about";

interface AboutWorkflowProps {
  readonly workflow: readonly AboutWorkflowStep[];
}

/**
 * Sekcja 4-etapowego procesu tworzenia oprogramowania.
 */
export function AboutWorkflow({ workflow }: AboutWorkflowProps) {
  return (
    <section aria-labelledby="about-workflow-heading" className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-label text-primary">Metodologia &amp; Proces</span>
        <h2
          id="about-workflow-heading"
          className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
        >
          Jak podchodzę do każdego projektu
        </h2>
        <p className="max-w-2xl text-body-md text-muted-foreground">
          Przejrzysty proces od pierwszego briefu po bezawaryjne wdrożenie na infrastrukturę produkcyjną.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.map((item) => (
          <div
            key={item.step}
            className="group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-surface-container/80"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-cyan-400/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />

            <span className="inline-block font-mono text-sm font-semibold tracking-[0.2em] text-primary">
              {item.step}
            </span>

            <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
