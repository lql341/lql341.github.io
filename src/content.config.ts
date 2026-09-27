import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    summary: z.string(),
    summaryEn: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    tagsZh: z.array(z.string()).optional(),
    href: z.string(),
    hrefEn: z.string().optional(),
    featured: z.boolean().default(false),
    homeOrder: z.number().default(99),
    metric: z.string().optional(),
    metricLabel: z.string().optional(),
    metricLabelEn: z.string().optional(),
  }),
});

export const collections = { reports };
