import { defineConfig, UserConfig } from 'vite';
import path from 'path';
import builtins from 'builtin-modules';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(async ({ mode }) => {
  const { resolve } = path;
  const prod = mode === 'production';

  const config: UserConfig = {
    build: {
      outDir: 'dist',
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'main',
        fileName: () => 'main.js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external: [
          'obsidian',
          '@lezer/highlight',
          '@lezer/lr',
          ...builtins,
        ],
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'styles.css';
            }
            return '[name].[ext]';
          }
        }
      }
    },
    plugins: [
      viteStaticCopy({
        targets: [
          { src: 'manifest.json', dest: '' }
        ]
      })
    ]
  };

  return config;
});
