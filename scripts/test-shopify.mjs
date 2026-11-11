import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const temporary = await mkdtemp(join(tmpdir(), 'shopify-behavior-tests-'));
const helperOutput = join(temporary, 'shopifyLead.mjs');
let exitCode = 1;

try {
  await build({
    absWorkingDir: root,
    entryPoints: ['src/lib/shopifyLead.ts'],
    outfile: helperOutput,
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node22',
    define: { 'import.meta.env': '{}' },
    plugins: [{
      name: 'isolated-supabase-config',
      setup(builder) {
        builder.onResolve({ filter: /^\.\/supabase$/ }, () => ({ path: 'test-config', namespace: 'isolated-config' }));
        builder.onLoad({ filter: /.*/, namespace: 'isolated-config' }, () => ({
          contents: 'export const supabaseConfig = { url: "https://lead-backend.invalid", anonKey: "test-public-key" };',
          loader: 'js',
        }));
      },
    }],
  });
  await build({
    absWorkingDir: root,
    entryPoints: ['tests/shopifyLead.test.ts'],
    outfile: join(temporary, 'shopifyLead.test.mjs'),
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node22',
    plugins: [{
      name: 'tested-module',
      setup(builder) {
        builder.onResolve({ filter: /src\/lib\/shopifyLead$/ }, () => ({ path: helperOutput, external: true }));
      },
    }],
  });
  const result = spawnSync(process.execPath, [
    '--test', '--experimental-test-coverage',
    '--test-coverage-include=**/shopifyLead.mjs',
    '--test-coverage-lines=80', '--test-coverage-branches=80', '--test-coverage-functions=80',
    resolve(temporary, 'shopifyLead.test.mjs'),
  ], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  exitCode = result.status ?? 1;
} finally {
  await rm(temporary, { recursive: true, force: true });
}

process.exitCode = exitCode;
