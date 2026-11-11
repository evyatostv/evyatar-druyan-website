import { build } from 'vite';
import { copyFile, cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist-shopify');
const destination = join(root, 'shopify');

// Publish only after Vite succeeds. Never clear the existing site directory.
await build({ configFile: join(root, 'vite.shopify.config.ts') });
await mkdir(destination, { recursive: true });
await cp(output, destination, { recursive: true });

// GitHub Pages needs a physical index for each directly visited route.
for (const route of ['maintenance', 'build', 'inbox']) {
  const directory = join(destination, route);
  await mkdir(directory, { recursive: true });
  await copyFile(join(output, 'index.html'), join(directory, 'index.html'));
}

console.log('Prepared /shopify/, /shopify/maintenance/, /shopify/build/, and /shopify/inbox/.');
