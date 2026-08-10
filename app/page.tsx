import { HeroSection } from "@/components/hero/hero-section";

export default function Home() {
  return (
    <main className="min-h-[calc(100svh-3.5rem)] bg-background px-4 py-8 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <HeroSection />
      </div>
    </main>
  );
}
