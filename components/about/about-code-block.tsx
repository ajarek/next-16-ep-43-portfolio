"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { type DeveloperProfileData } from "@/lib/about"

interface AboutCodeBlockProps {
  readonly profile: DeveloperProfileData
}

/**
 * Interaktywny blok kodu w stylu okna terminala / edytora wg DESIGN.md.
 * Zawiera przyciski okna („traffic lights”) oraz możliwość skopiowania profilu.
 */
export function AboutCodeBlock({ profile }: AboutCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignoruj błąd schowka w nieobsługiwanym środowisku
    }
  }

  return (
    <div className='relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface-container-low/90 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40'>
      {/* Pasek tytułowy okna */}
      <div className='flex items-center justify-between border-b border-border/60 bg-surface-container px-4 py-3 sm:px-5'>
        <div className='flex items-center gap-2'>
          <span className='size-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]' />
          <span className='size-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]' />
          <span className='size-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]' />
          <span className='ml-2 hidden font-mono text-xs text-on-surface-variant/70 sm:inline-flex items-center gap-1.5'>
            <Terminal className='size-3.5 text-primary' />
            {profile.fileName}
          </span>
        </div>

        <button
          type='button'
          onClick={handleCopy}
          className='inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3 py-1 font-mono text-xs text-on-surface-variant transition-colors hover:border-primary/40 hover:text-foreground'
          aria-label='Kopiuj konfigurację profilu'
        >
          {copied ? (
            <>
              <Check className='size-3.5 text-green-400' />
              <span className='text-green-400'>Skopiowano</span>
            </>
          ) : (
            <>
              <Copy className='size-3.5 text-on-surface-variant' />
              <span>Kopiuj</span>
            </>
          )}
        </button>
      </div>

      {/* Ciało kodu ze stylizacją monospace */}
      <div className='relative overflow-x-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-on-surface sm:text-[0.8125rem]'>
        <pre className='selection:bg-primary/30 selection:text-white'>
          <code>
            <span className='text-purple-400'>export const</span>{" "}
            <span className='text-cyan-300'>developer</span>:{" "}
            <span className='text-yellow-300'>DeveloperProfile</span> = &#123;
            {"\n"} <span className='text-on-surface-variant'>alias</span>:{" "}
            <span className='text-emerald-300'>&apos;AJAREK DEV&apos;</span>,
            {"\n"} <span className='text-on-surface-variant'>role</span>:{" "}
            <span className='text-emerald-300'>
              &apos;Full-Stack &amp; UI Developer&apos;
            </span>
            ,{"\n"} <span className='text-on-surface-variant'>location</span>:{" "}
            <span className='text-emerald-300'>
              &apos;Polska (CET / UTC+1)&apos;
            </span>
            ,{"\n"} <span className='text-on-surface-variant'>stack</span>:
            &#123;
            {"\n"} <span className='text-on-surface-variant'>core</span>: [
            <span className='text-emerald-300'>&apos;TypeScript&apos;</span>,{" "}
            <span className='text-emerald-300'>&apos;React 19&apos;</span>,{" "}
            <span className='text-emerald-300'>&apos;Next.js 16&apos;</span>],
            {"\n"} <span className='text-on-surface-variant'>styling</span>: [
            <span className='text-emerald-300'>
              &apos;Tailwind CSS v4&apos;
            </span>
            ,{" "}
            <span className='text-emerald-300'>&apos;Design Systems&apos;</span>
            , <span className='text-emerald-300'>&apos;WebGL&apos;</span>],
            {"\n"} <span className='text-on-surface-variant'>backend</span>: [
            <span className='text-emerald-300'>&apos;Node.js&apos;</span>,{" "}
            <span className='text-emerald-300'>&apos;PostgreSQL&apos;</span>,{" "}
            <span className='text-emerald-300'>&apos;Prisma&apos;</span>,{" "}
            <span className='text-emerald-300'>&apos;Firebase&apos;</span>],
            {"\n"} <span className='text-on-surface-variant'>architecture</span>
            : [
            <span className='text-emerald-300'>
              &apos;Server Components&apos;
            </span>
            ,{" "}
            <span className='text-emerald-300'>&apos;Server Actions&apos;</span>
            , <span className='text-emerald-300'>&apos;Type-Safety&apos;</span>]
            {"\n"} &#125;,
            {"\n"} <span className='text-on-surface-variant'>principles</span>:
            [{"\n"}{" "}
            <span className='text-emerald-300'>
              &apos;Pixel-perfect precision&apos;
            </span>
            ,{"\n"}{" "}
            <span className='text-emerald-300'>
              &apos;Sub-100ms interactions&apos;
            </span>
            ,{"\n"}{" "}
            <span className='text-emerald-300'>
              &apos;Clean &amp; maintainable code&apos;
            </span>
            ,{"\n"}{" "}
            <span className='text-emerald-300'>
              &apos;Empathetic user experience&apos;
            </span>
            {"\n"} ],
            {"\n"} <span className='text-on-surface-variant'>status</span>:{" "}
            <span className='text-yellow-300'>
              &apos;Ready for ambitious challenges&apos;
            </span>
            {"\n"}&#125;;
          </code>
        </pre>
      </div>

      {/* Pasek statusu edytora na dole */}
      <div className='flex items-center justify-between border-t border-border/40 bg-surface-container-lowest/60 px-4 py-2 font-mono text-[0.7rem] text-on-surface-variant/60'>
        <span>TypeScript · UTF-8</span>
        <span className='flex items-center gap-1.5'>
          <span className='size-2 rounded-full bg-emerald-400' />
          Live &amp; Ready
        </span>
      </div>
    </div>
  )
}
