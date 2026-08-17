import Image from "next/image"
import Link from "next/link"
import { Glass } from "@/components/canvasui/Glass"
import { buttonVariants } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export function HeroSection() {
  return (
    <Glass>
      <section id='start' className='relative isolate py-10 lg:py-14'>
        <div className='relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
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
                  className: "h-12 px-6 text-base ",
                })}
              >
                <Phone size={40} className='text-green-500' />
              </Link>
              <Link
                href='/contact'
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "h-12 px-6 text-base",
                })}
              >
                <Mail size={40} className='text-indigo-400' />
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

          <div className='relative mx-auto w-full max-w-124'>
            <div className='absolute inset-0 rounded-[2rem] border border-primary/20 bg-primary/10 blur-3xl' />
            <div className='relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-low/80 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur'>
              <div className='relative overflow-hidden rounded-[1.35rem] border border-border/60 bg-background/70 p-2'>
                <Image
                  src='/images/hero.png'
                  alt='Ilustracja przedstawiająca nowoczesny interfejs portfolio'
                  width={1200}
                  height={900}
                  priority
                  className='h-auto w-full rounded-[1.15rem] object-cover'
                />
              </div>
              <div className='absolute bottom-6 left-6 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 backdrop-blur'>
                <p className='text-xs uppercase tracking-[0.24em] text-muted-foreground'>
                  Dostarczam
                </p>
                <p className='mt-1 text-lg font-semibold text-foreground'>
                  premium experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Glass>
  )
}
