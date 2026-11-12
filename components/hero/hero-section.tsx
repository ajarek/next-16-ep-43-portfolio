import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { HeroVideo } from "./hero-video"

export function HeroSection() {
  return (
    <section id='start' className='relative isolate py-8 sm:py-10 lg:py-14'>
      <div className='relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14'>
        {/* Lewa kolumna: teksty nagłówkowe i przyciski akcji */}
        <div className='max-w-2xl space-y-6'>
          <div className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary'>
            <span className='size-2 rounded-full bg-primary' />
            Frontend & UI Developer
          </div>

          <div className='space-y-4'>
            <h1 className='text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl'>
              Tworzę strony, które wyglądają jak przyszłość.
            </h1>
            <p className='max-w-xl text-lg text-muted-foreground sm:text-xl'>
              Projektuję nowoczesne, szybkie i estetyczne doświadczenia webowe
              z naciskiem na detale, jakość kodu i elegancki interfejs.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Link
              href='#projekty'
              className={buttonVariants({
                size: "lg",
                variant: "gradient",
                className: "h-12 px-6 text-base",
              })}
            >
              Zobacz moje projekty
            </Link>
            <Link
              href='tel:+48573219230'
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "h-12 px-6 text-base",
              })}
              title='Zadzwoń do mnie'
              aria-label='Zadzwoń do mnie'
            >
              <Phone size={24} className='text-emerald-400' />
            </Link>
            <Link
              href='/contact'
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "h-12 px-6 text-base",
              })}
              title='Napisz wiadomość'
              aria-label='Napisz wiadomość'
            >
              <Mail size={24} className='text-indigo-400' />
            </Link>
          </div>

          <div className='flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground'>
            <div className='rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur'>
              React • Next.js • TypeScript
            </div>
            <div className='rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur'>
              UI/UX • Animacje • Performance
            </div>
          </div>
        </div>

        {/* Prawa kolumna: interaktywny odtwarzacz wideo 16/9 */}
        <div className='relative mx-auto w-full max-w-2xl lg:max-w-none'>
          <HeroVideo />
        </div>
      </div>
    </section>
  )
}
