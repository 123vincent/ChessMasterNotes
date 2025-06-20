// File: vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['obsidian'],
      output: {
        format: 'cjs',
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith('.css') ? 'styles.css' : assetInfo.name!,
      },
      plugins: [
        copy({
          targets: [{ src: 'manifest.json', dest: 'dist' }],
          hook: 'writeBundle',
        }),
      ],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});