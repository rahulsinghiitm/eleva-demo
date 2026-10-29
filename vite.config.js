import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'build', rollupOptions: { input: { app: resolve('index.html'), onboarding: resolve('onboarding.html') } } },
});
