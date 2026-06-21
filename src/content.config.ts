import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    thumbnail: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    skills: z.array(z.string()),
    thumbnail: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    dateRange: z.string(),
    bullets: z.array(z.string()),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/education' }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    dateRange: z.string(),
    achievements: z.array(z.string()),
  }),
});

export const collections = { blog, projects, experience, education };
