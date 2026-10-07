import { quoteRequestSchema, type QuoteRequestPayload } from './quote-request-schema';

type NotificationResponse = { ok: boolean; json: () => Promise<{ success?: boolean }> };

async function notifyByEmail(payload: QuoteRequestPayload): Promise<NotificationResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('/api/send-quote-email', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal,
    });
    const result = await response.json();
    return { ok: response.ok, json: async () => result };
  } finally { clearTimeout(timeout); }
}

// Confirmation means a durable CRM record exists; email delivery is a separate outcome.
export async function submitQuoteRequest(
  input: QuoteRequestPayload,
  saveRequest: (payload: ReturnType<typeof quoteRequestSchema.parse>) => Promise<unknown>,
  notify: (payload: QuoteRequestPayload) => Promise<NotificationResponse> = notifyByEmail,
) {
  const payload = quoteRequestSchema.parse(input);
  await saveRequest(payload);
  try {
    const response = await notify(payload);
    const result = await response.json();
    return { notificationSent: response.ok && result.success === true };
  } catch {
    return { notificationSent: false };
  }
}
