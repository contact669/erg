'use server';
/**
 * @fileOverview A quote generation AI agent.
 *
 * - generateQuote - A function that handles the quote generation process.
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuoteInputSchema = z.object({
  projectDescription: z.string().describe('The detailed description of the renovation project provided by the client.'),
  serviceType: z.string().describe('The type of service requested (e.g., "Rénovation de salle de bain", "Rénovation complète").'),
});
export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

const QuoteLineSchema = z.object({
    description: z.string().describe("Description of the work or item."),
    quantity: z.number().describe("Quantity of the item or unit of work."),
    unitPrice: z.number().describe("Price per unit."),
    total: z.number().describe("Total price for this line (quantity * unitPrice).")
});

const GenerateQuoteOutputSchema = z.object({
  title: z.string().describe("A clear and concise title for the quote."),
  lineItems: z.array(QuoteLineSchema).describe('The detailed line items of the quote.'),
  subtotal: z.number().describe('The subtotal of all line items.'),
  taxRate: z.number().describe('The applicable tax rate (e.g., 20 for 20%).'),
  taxAmount: z.number().describe('The calculated tax amount.'),
  total: z.number().describe('The final total amount (subtotal + tax).'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;


export async function generateQuote(input: GenerateQuoteInput): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  input: { schema: GenerateQuoteInputSchema },
  output: { schema: GenerateQuoteOutputSchema },
  prompt: `You are an expert quantity surveyor for a high-end French renovation company. Your task is to generate a detailed and realistic quote based on a client's project description.

Use the provided project description and service type to create a list of line items. For each line item, provide a clear description, a realistic quantity, a plausible unit price (in Euros), and the calculated total.

- The response MUST be in French.
- Unit prices should reflect high-end market rates in Paris, France.
- Group the line items logically (e.g., Démolition, Plomberie, Électricité, Finitions).
- Calculate the subtotal, tax (assume a 20% VAT rate unless specified otherwise), and the final total.
- The title of the quote should be concise and reflect the project name.

Client Project Description:
{{{projectDescription}}}

Service Type:
{{{serviceType}}}

Generate the structured quote based on this information.
`,
});

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
