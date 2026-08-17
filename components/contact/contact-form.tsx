"use client"

import { useActionState, useId, useState } from "react"
import { CheckCircle2, Loader2, Radio, Send } from "lucide-react"

import { sendContactMessage } from "@/app/contact/actions"
import { Button } from "@/components/ui/button"
import {
  CONTACT,
  INITIAL_CONTACT_STATE,
  type ContactChoice,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact"
import { cn } from "@/lib/utils"

const MESSAGE_MAX = 2000

/**
 * Formularz briefu w oknie terminala (DESIGN.md → Interactive Code Block).
 */
export function ContactForm() {
  const formId = useId()
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL_CONTACT_STATE,
  )
  const [messageLength, setMessageLength] = useState(0)

  if (state.status === "success") {
    return <HandshakeSuccess message={state.message} />
  }

  return (
    <section
      aria-labelledby={`${formId}-title`}
      className='overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-low/80 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl'
    >
      <TerminalChrome pending={pending} />

      <form action={formAction} className='flex flex-col gap-6 p-5 sm:p-7'>
        <div className='space-y-1'>
          <h2
            id={`${formId}-title`}
            className='text-lg font-semibold tracking-[-0.02em] text-foreground'
          >
            Nowy kanał
          </h2>
          <p className='text-sm text-muted-foreground'>
            Wypełnij brief — resztę doprecyzujemy na rozmowie.
          </p>
        </div>

        {/* Pole honeypot — niewidoczne dla ludzi, łapie boty. */}
        <p className='absolute left-[-10000px] top-auto h-px w-px overflow-hidden'>
          <label htmlFor={`${formId}-company`}>Adres strony firmowej</label>
          <input
            id={`${formId}-company`}
            name='company_url'
            type='text'
            tabIndex={-1}
            autoComplete='off'
          />
        </p>

        <div className='grid gap-5 sm:grid-cols-2'>
          <Field
            id={`${formId}-name`}
            name='name'
            label='Imię'
            placeholder='Jak się do Ciebie zwracać?'
            autoComplete='name'
            error={state.fieldErrors.name}
            required
          />
          <Field
            id={`${formId}-email`}
            name='email'
            label='E-mail'
            type='email'
            placeholder='jan@studio.pl'
            autoComplete='email'
            error={state.fieldErrors.email}
            required
          />
        </div>

        <ChoiceGroup
          legend='Typ projektu'
          name='projectType'
          options={CONTACT.projectTypes}
          error={state.fieldErrors.projectType}
          required
        />

        <ChoiceGroup
          legend='Budżet (opcjonalnie)'
          name='budget'
          options={CONTACT.budgets}
          error={state.fieldErrors.budget}
        />

        <div className='flex flex-col gap-2'>
          <div className='flex items-end justify-between gap-3'>
            <label
              htmlFor={`${formId}-message`}
              className='text-label text-on-surface-variant/80'
            >
              Wiadomość
            </label>
            <span
              className={cn(
                "font-mono text-[0.65rem] tracking-[0.14em] text-on-surface-variant/50",
                messageLength >= MESSAGE_MAX && "text-error",
              )}
            >
              {String(messageLength).padStart(2, "0")} / {MESSAGE_MAX}
            </span>
          </div>
          <textarea
            id={`${formId}-message`}
            name='message'
            required
            minLength={20}
            maxLength={MESSAGE_MAX}
            rows={6}
            placeholder='Co budujemy, dla kogo i na kiedy?'
            onChange={(event) => setMessageLength(event.target.value.length)}
            aria-invalid={Boolean(state.fieldErrors.message)}
            aria-describedby={
              state.fieldErrors.message ? `${formId}-message-error` : undefined
            }
            className={fieldClassName(
              Boolean(state.fieldErrors.message),
              "min-h-36 resize-y py-3",
            )}
          />
          <FieldError
            id={`${formId}-message-error`}
            message={state.fieldErrors.message}
          />
        </div>

        {state.status === "error" && state.message ? (
          <p
            role='alert'
            className='rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error'
          >
            {state.message}
          </p>
        ) : null}

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='font-mono text-[0.65rem] tracking-[0.16em] text-on-surface-variant/50'>
            handshake · encrypted · no spam
          </p>
          <Button
            type='submit'
            variant='gradient'
            size='pill'
            disabled={pending}
            className='h-11 px-6 text-sm font-semibold uppercase tracking-[0.14em]'
          >
            {pending ? (
              <>
                <Loader2 aria-hidden className='size-4 animate-spin' />
                Nadawanie…
              </>
            ) : (
              <>
                Wyślij sygnał
                <Send aria-hidden className='size-4' />
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  )
}

function TerminalChrome({ pending }: { readonly pending: boolean }) {
  return (
    <div className='flex items-center justify-between gap-3 border-b border-white/6 bg-surface-container-lowest/70 px-4 py-3 sm:px-5'>
      <div className='flex items-center gap-2'>
        <span aria-hidden className='size-2.5 rounded-full bg-[#ff5f57]' />
        <span aria-hidden className='size-2.5 rounded-full bg-[#febc2e]' />
        <span aria-hidden className='size-2.5 rounded-full bg-[#28c840]' />
        <span className='ml-2 font-mono text-[0.7rem] tracking-[0.12em] text-on-surface-variant/70'>
          nowa-wiadomosc.ts
        </span>
      </div>
      <p className='flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] text-on-surface-variant/55'>
        <Radio
          aria-hidden
          className={cn("size-3 text-tertiary", pending && "animate-pulse")}
        />
        {pending ? "transmitting" : "idle"}
      </p>
    </div>
  )
}

function HandshakeSuccess({ message }: { readonly message: string }) {
  const lines = [
    "$ ajarek handshake --init",
    "✓ payload validated",
    "✓ channel opened",
    `→ ${message}`,
  ]

  return (
    <section
      aria-live='polite'
      className='animate-in fade-in overflow-hidden rounded-[1.75rem] border border-primary/30 bg-surface-container-low/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent),0_24px_70px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)] backdrop-blur-xl'
    >
      <TerminalChrome pending={false} />
      <div className='flex flex-col items-start gap-6 p-6 sm:p-8'>
        <span className='inline-flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_-6px_var(--primary)]'>
          <CheckCircle2 aria-hidden className='size-6' />
        </span>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold tracking-[-0.02em] text-foreground'>
            Połączenie nawiązane
          </h2>
          <p className='max-w-md text-sm text-muted-foreground'>{message}</p>
        </div>
        <ol className='w-full space-y-2 rounded-2xl border border-border/50 bg-background/40 p-4 font-mono text-[0.78rem] leading-relaxed text-on-surface-variant'>
          {lines.map((line, index) => (
            <li
              key={line}
              className='animate-in fade-in slide-in-from-left-2 fill-mode-both'
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className='mr-3 text-on-surface-variant/40'>
                {String(index + 1).padStart(2, "0")}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

interface FieldProps {
  readonly id: string
  readonly name: ContactField
  readonly label: string
  readonly placeholder: string
  readonly error?: string
  readonly type?: "text" | "email"
  readonly autoComplete?: string
  readonly required?: boolean
}

function Field({
  id,
  name,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id} className='text-label text-on-surface-variant/80'>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClassName(Boolean(error))}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

interface ChoiceGroupProps {
  readonly legend: string
  readonly name: Extract<ContactField, "projectType" | "budget">
  readonly options: readonly ContactChoice[]
  readonly error?: string
  readonly required?: boolean
}

function ChoiceGroup({
  legend,
  name,
  options,
  error,
  required,
}: ChoiceGroupProps) {
  return (
    <fieldset className='flex flex-col gap-3'>
      <legend className='text-label text-on-surface-variant/80'>
        {legend}
      </legend>
      <div role='group' className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <label key={option.id} className='group/chip cursor-pointer'>
            <input
              type='radio'
              name={name}
              value={option.id}
              required={required}
              className='peer sr-only'
            />
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
                "border-border/70 bg-background/40 text-on-surface-variant",
                "peer-checked:border-primary/60 peer-checked:bg-primary/15 peer-checked:text-primary peer-checked:shadow-[0_0_20px_-6px_var(--primary)]",
                "peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                "group-hover/chip:border-primary/40 group-hover/chip:text-on-surface",
              )}
            >
              <span
                aria-hidden
                className='size-1.5 rounded-full bg-current opacity-40 peer-checked:opacity-100'
              />
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </fieldset>
  )
}

function FieldError({
  id,
  message,
}: {
  readonly id?: string
  readonly message?: string
}) {
  if (!message) return null
  return (
    <p id={id} role='alert' className='text-xs text-error'>
      {message}
    </p>
  )
}

function fieldClassName(invalid: boolean, extra?: string): string {
  return cn(
    "h-11 w-full rounded-lg border bg-background/60 px-4 text-sm text-foreground transition-all duration-300 outline-none placeholder:text-on-surface-variant/50",
    invalid
      ? "border-error/50 focus:border-error focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--error)_40%,transparent)]"
      : "border-border/70 focus:border-primary/50 focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent),0_0_24px_-8px_var(--primary)]",
    extra,
  )
}

export type { ContactFieldErrors }
