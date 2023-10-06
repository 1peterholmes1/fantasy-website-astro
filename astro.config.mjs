import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), sanity({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    apiVersion: '2023-10-04',
    useCdn: true
  })]
});
