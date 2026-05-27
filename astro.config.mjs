// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.com',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()]
});
