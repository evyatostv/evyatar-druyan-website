import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('./lead-entry', import.meta.url)),
  base: '/shopify/',
  plugins: [react(), tailwindcss()],
  build: { outDir: fileURLToPath(new URL('./dist-shopify', import.meta.url)), emptyOutDir: true },
});
