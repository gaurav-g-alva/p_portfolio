// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gaurav-g-alva.github.io', // Replace with your domain
  base: '/prf',                   // Replace with repository name, or omit if user page
  vite: {
    plugins: [tailwindcss()],
  },
});
