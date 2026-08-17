/**
 * Dekoracyjna wizualizacja „sygnału” — kryształ i pierścienie w CSS,
 * w tonie skill-hub (future-noir, fiolet–turkus). Bez obrazu rastrowego.
 */
export function ContactSignal() {
  return (
    <div
      aria-hidden
      className='relative isolate overflow-hidden rounded-[1.35rem] border border-border/60 bg-[#0c0d14]'
    >
      <div className='bg-grid pointer-events-none absolute inset-0 opacity-20' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_45%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_72%)]' />

      <div className='relative mx-auto flex aspect-5/3 w-full items-center justify-center sm:aspect-video'>
        <span className='absolute size-44 rounded-full border border-primary/20 motion-safe:animate-[ping_3.6s_ease-out_infinite] sm:size-52' />
        <span className='absolute size-32 rounded-full border border-cyan-400/25 motion-safe:animate-[ping_3.6s_ease-out_1.1s_infinite] sm:size-40' />
        <span className='absolute size-20 rounded-full border border-tertiary/30 motion-safe:animate-[ping_3.6s_ease-out_2.2s_infinite] sm:size-24' />

        <span className='relative flex size-14 items-center justify-center sm:size-16'>
          <span className='absolute inset-0 rotate-45 rounded-lg border border-primary/50 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--primary)_35%,transparent),color-mix(in_oklab,#06B6D4_18%,transparent))] shadow-[0_0_40px_-6px_var(--primary)]' />
          <span className='absolute inset-2 rotate-45 rounded-md bg-[linear-gradient(160deg,#e9ddff_0%,#8069BF_48%,#06B6D4_100%)] opacity-80' />
          <span className='relative size-2 rounded-full bg-white shadow-[0_0_12px_white]' />
        </span>
      </div>
    </div>
  )
}
