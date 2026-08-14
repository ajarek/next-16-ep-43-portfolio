import type { Metadata } from "next";

import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactSpotlight } from "@/components/contact/contact-spotlight";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nawiąż współpracę z AJAREK DEV — krótki brief, odpowiedź w ciągu 24 godzin. Strony, sklepy i aplikacje premium.",
};

/**
 * Strona `/contact` — kanał komunikacji w estetyce future-noir.
 * Dane pochodzą z `lib/contact.ts`; formularz wysyła Server Action.
 */
export default function ContactPage() {
  return (
    <div
      id="kontakt"
      className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent)_0%,transparent_42%),linear-gradient(135deg,var(--surface-container)_0%,var(--surface-container-low)_100%)] px-4 py-10 scroll-mt-20 sm:px-6 md:min-h-[calc(100svh-4rem)] md:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <ContactSpotlight />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-label inline-flex items-center gap-2 text-primary">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                {CONTACT.overline}
              </span>
              <span className="font-mono text-xs tracking-[0.2em] text-on-surface-variant/60">
                {CONTACT.path}
              </span>
            </div>
            <h1 className="text-headline-lg-responsive text-foreground">
              {CONTACT.heading}{" "}
              <span className="text-primary">{CONTACT.headingAccent}</span>
            </h1>
            <p className="max-w-xl text-body-lg text-muted-foreground">
              {CONTACT.description}
            </p>
          </div>

          <p className="flex items-center gap-2 font-mono text-sm tracking-[0.15em] text-on-surface-variant/70">
            <span
              aria-hidden
              className="inline-flex size-2 rounded-full bg-tertiary shadow-[0_0_10px_var(--tertiary)]"
            />
            {CONTACT.availability.responseTime} odpowiedzi
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <ContactForm />
          <ContactAside />
        </div>
      </div>
    </div>
  );
}
