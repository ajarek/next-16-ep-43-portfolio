import { ArrowUpRight, Code2, Mail, MapPin, Phone, Timer } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/** Własny komponent SVG logo LinkedIn — lucide-react nie zawiera tej ikony. */
function LinkedinIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
      className={className}
      {...props}
    >
      <path d='M20.447 20.452H17.01v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.585V9h3.299v1.561h.046c.46-.87 1.58-1.786 3.253-1.786 3.48 0 4.124 2.291 4.124 5.271v6.406zM5.337 7.433a1.914 1.914 0 1 1 0-3.828 1.914 1.914 0 0 1 0 3.828zm1.649 13.019H3.685V9h3.301v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  )
}

import { ContactClock } from "@/components/contact/contact-clock"
import { ContactSignal } from "@/components/contact/contact-signal"
import {
  CONTACT,
  type ContactChannel,
  type ContactChannelKind,
} from "@/lib/contact"
import { cn } from "@/lib/utils"

const CHANNEL_ICONS: Record<
  ContactChannelKind,
  LucideIcon | typeof LinkedinIcon
> = {
  email: Mail,
  phone: Phone,
  github: Code2,
  linkedin: LinkedinIcon,
}

/**
 * Panel boczny strony kontaktowej — dostępność, kanały, proces i sygnał.
 * Komponent serwerowy; zegar jest jedyną warstwą kliencką.
 */
export function ContactAside() {
  const { availability, channels, process } = CONTACT
  const primary = channels.filter(
    (channel) => channel.id === "email" || channel.id === "phone",
  )
  const social = channels.filter(
    (channel) => channel.id === "github" || channel.id === "linkedin",
  )

  return (
    <aside className='flex flex-col gap-4'>
      <div className='relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 p-5 backdrop-blur-xl'>
        <span
          aria-hidden
          className='pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-tertiary/10 blur-3xl'
        />
        <div className='relative flex flex-col gap-4'>
          <p className='flex items-center gap-2 text-sm text-on-surface'>
            <span aria-hidden className='relative flex size-2'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-tertiary/70' />
              <span className='relative inline-flex size-2 rounded-full bg-tertiary' />
            </span>
            {availability.label}
          </p>
          <ContactClock
            timezoneIana={availability.timezoneIana}
            timezoneLabel={availability.timezone}
          />
          <dl className='grid grid-cols-2 gap-3 text-sm'>
            <div className='flex items-start gap-2 text-on-surface-variant'>
              <Timer aria-hidden className='mt-0.5 size-3.5 text-primary' />
              <div>
                <dt className='text-label text-on-surface-variant/55'>
                  Odpowiedź
                </dt>
                <dd className='mt-1 text-on-surface'>
                  {availability.responseTime}
                </dd>
              </div>
            </div>
            <div className='flex items-start gap-2 text-on-surface-variant'>
              <MapPin aria-hidden className='mt-0.5 size-3.5 text-primary' />
              <div>
                <dt className='text-label text-on-surface-variant/55'>
                  Lokalizacja
                </dt>
                <dd className='mt-1 text-on-surface'>
                  {availability.location}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
        {primary.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      <div className='grid grid-cols-2 gap-3'>
        {social.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} compact />
        ))}
      </div>

      <ol className='flex flex-col gap-0 overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/75 backdrop-blur-xl'>
        {process.map((step, index) => (
          <li
            key={step.index}
            className={cn(
              "flex gap-4 px-5 py-4",
              index < process.length - 1 && "border-b border-white/6",
            )}
          >
            <span className='font-mono text-xs tracking-[0.18em] text-primary'>
              {step.index}
            </span>
            <div className='space-y-1'>
              <p className='text-sm font-medium tracking-[-0.01em] text-foreground'>
                {step.title}
              </p>
              <p className='text-sm text-muted-foreground'>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <ContactSignal />
    </aside>
  )
}

interface ChannelCardProps {
  readonly channel: ContactChannel
  readonly compact?: boolean
}

function ChannelCard({ channel, compact = false }: ChannelCardProps) {
  const Icon = CHANNEL_ICONS[channel.id]

  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noreferrer noopener" : undefined}
      className={cn(
        "group/channel relative flex overflow-hidden rounded-2xl border border-border/70 bg-surface-container-low/75 backdrop-blur-xl outline-none transition-all duration-300",
        "hover:border-primary/40 hover:shadow-[0_0_24px_-10px_var(--primary)]",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        compact ? "flex-col gap-3 p-4" : "items-center gap-4 p-4",
      )}
    >
      <span className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary'>
        <Icon aria-hidden className='size-4' />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='text-label block text-on-surface-variant/55'>
          {channel.label}
        </span>
        <span className='mt-1 block truncate text-sm font-medium text-foreground'>
          {channel.value}
        </span>
        {compact ? null : (
          <span className='mt-0.5 block text-xs text-muted-foreground'>
            {channel.hint}
          </span>
        )}
      </span>
      <ArrowUpRight
        aria-hidden
        className='size-4 shrink-0 text-on-surface-variant/40 transition-all duration-300 group-hover/channel:translate-x-0.5 group-hover/channel:-translate-y-0.5 group-hover/channel:text-primary'
      />
    </a>
  )
}
