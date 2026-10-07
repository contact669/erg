import { z } from 'zod';

export const quoteRequestSchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  clientEmail: z.string().trim().email().max(254),
  clientPhone: z.string().trim().max(20).regex(/^[0-9+().\s-]*$/).optional().default(''),
  projectDescription: z.string().trim().min(20).max(12000),
});
export type QuoteRequestPayload = z.input<typeof quoteRequestSchema>;
