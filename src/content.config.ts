import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const policiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/policies" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  'policies': policiesCollection,
};
