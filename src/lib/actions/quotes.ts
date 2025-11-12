'use server';

import { createQuoteRequestFromClient } from '@/lib/services/quotes';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequest(data: QuoteRequestData) {
  try {
    const requestId = await createQuoteRequestFromClient(data);
    return { success: true, requestId };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
