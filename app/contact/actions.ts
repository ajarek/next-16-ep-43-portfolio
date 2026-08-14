"use server";

import {
  INITIAL_CONTACT_STATE,
  hasFieldErrors,
  isHoneypotFilled,
  parseContactForm,
  validateContactPayload,
  type ContactFormState,
} from "@/lib/contact";

/**
 * Przyjmuje brief z formularza kontaktowego.
 * Walidacja i honeypot żyją w `lib/contact.ts`.
 * Brak bramki e-mail w portfolio — poprawny sygnał logujemy po stronie serwera.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if (isHoneypotFilled(formData)) {
    return {
      status: "success",
      message: "Sygnał dotarł. Odezwę się w ciągu 24 godzin.",
      fieldErrors: {},
    };
  }

  const payload = parseContactForm(formData);
  const fieldErrors = validateContactPayload(payload);

  if (hasFieldErrors(fieldErrors)) {
    return {
      status: "error",
      message: "Popraw pola formularza i wyślij sygnał ponownie.",
      fieldErrors,
    };
  }

  console.info("[kontakt] nowy brief", {
    name: payload.name,
    email: payload.email,
    projectType: payload.projectType,
    budget: payload.budget || null,
    messageLength: payload.message.length,
  });

  return {
    status: "success",
    message: "Sygnał dotarł. Odezwę się w ciągu 24 godzin.",
    fieldErrors: {},
  };
}

export { INITIAL_CONTACT_STATE };
