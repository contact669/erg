'use server';

/**
 * @fileOverview A content generation AI agent.
 *
 * - generateContent - A function that handles the content generation process.
 * - GenerateContentInput - The input type for the generateContent function.
 * - GenerateContentOutput - The return type for the generateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentInputSchema = z.object({
  contentType: z.enum(['service', 'location']).describe('The type of content to generate (service or location).'),
  topic: z.string().describe('The specific topic for the content (e.g., "renovation appartement" or "Paris 20").'),
  projectDetails: z.string().optional().describe('Optional details about relevant projects to incorporate.'),
  faqs: z.string().optional().describe('Optional FAQs to include in the content.'),
  keywords: z.string().optional().describe('Optional keywords to optimize the content for.'),
});
export type GenerateContentInput = z.infer<typeof GenerateContentInputSchema>;

const GenerateContentOutputSchema = z.object({
  title: z.string().describe('The generated title for the content.'),
  content: z.string().describe('The generated content for the service description or location-specific page.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: {schema: GenerateContentInputSchema},
  output: {schema: GenerateContentOutputSchema},
  prompt: `You are an expert content writer specializing in creating engaging and SEO-optimized content for a renovation company.

You will generate content for either a service description or a location-specific page based on the provided information.

Content Type: {{{contentType}}}
Topic: {{{topic}}}

{{#if projectDetails}}
Project Details:
{{{projectDetails}}}
{{/if}}

{{#if faqs}}
FAQs:
{{{faqs}}}
{{/if}}

{{#if keywords}}
Keywords:
{{{keywords}}}
{{/if}}

Instructions:
*   Write a title for the content.
*   Create an engaging introduction to the topic.
*   Incorporate relevant keywords to optimize the content for search engines.
*   Reference specific project details and FAQs where appropriate.
*   The content should be well-structured, informative, and persuasive.
*   The content should target users in Paris 20, Paris, and surrounding areas.
`,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
