/**
 * Okno kodu — wzorzec „Interactive Code Block" z DESIGN.md.
 * Deklaracja stosu jako plik, nie jako wishlist.
 */
export function StackCode() {
  return (
    <figure className='overflow-hidden rounded-[1.35rem] border border-border/70 bg-[#0c0d14] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]'>
      <figcaption className='flex items-center gap-3 border-b border-white/6 px-4 py-2.5'>
        <span aria-hidden className='flex items-center gap-1.5'>
          <span className='size-2.5 rounded-full bg-[#ff5f57]' />
          <span className='size-2.5 rounded-full bg-[#febc2e]' />
          <span className='size-2.5 rounded-full bg-[#28c840]' />
        </span>
        <span className='font-mono text-[0.68rem] tracking-[0.16em] text-on-surface-variant/60'>
          stack.ts
        </span>
      </figcaption>
      <pre className='overflow-x-auto px-4 py-4 font-mono text-[0.72rem] leading-6 text-on-surface-variant sm:px-5 sm:text-[0.78rem] sm:leading-7'>
        <code>
          <span className='text-on-surface-variant/45'>{"const "}</span>
          <span className='text-primary'>craft</span>
          <span className='text-on-surface-variant/45'>{" = {"}</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>fasada</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>
            {'["Next.js 16", "React 19", "Tailwind v4"]'}
          </span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>kontrakt</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>{'"TypeScript — tryb ścisły"'}</span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>silnik</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>{'["Node.js", "tRPC"]'}</span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>pamiec</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>
            {'["Prisma", "Firestore", "Supabase"]'}
          </span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>przeplyw</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>{'"Stripe"'}</span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>atmosfera</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>
            {'["WebGL", "siatka", "spotlight"]'}
          </span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          {"  "}
          <span className='text-[#cdc0e9]'>zasada</span>
          <span className='text-on-surface-variant/45'>{": "}</span>
          <span className='text-tertiary'>
            {'"użytkownik widzi tylko płynność"'}
          </span>
          <span className='text-on-surface-variant/45'>,</span>
          {"\n"}
          <span className='text-on-surface-variant/45'>{"} as const"}</span>
        </code>
      </pre>
    </figure>
  )
}
