import { HeroSection } from "@/components/hero/hero-section";
import SelectedProjects from "@/components/selected-projects/selected-projects";
import { EngineeringSection } from "@/components/engineering/engineering-section";

export default function Home() {
  return (
    <main className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-8 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10">
      {/* Jednolite tło całej strony — siatka „developerska" (DESIGN.md). */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <HeroSection />
        <SelectedProjects />
        <EngineeringSection />
      </div>
    </main>
  );
}
