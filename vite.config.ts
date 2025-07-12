import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/background.ts'),
        content: resolve(__dirname, 'src/content/content.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name?.includes('background'))
            return 'background/background.js';
          if (chunkInfo.name?.includes('content')) return 'content/content.js';
          if (chunkInfo.name?.includes('popup')) return 'popup/popup.js';
          return 'assets/[name].js';
        },
        assetFileNames: (assetInfo) => {
          const cssFiles = assetInfo.names.filter((name) =>
            name.endsWith('.css')
          );
          if (cssFiles.length > 0) {
            const name = cssFiles[0];
            if (name.includes('popup')) return 'popup/popup.css';
            if (name.includes('background')) return 'background/background.css';
            if (name.includes('content')) return 'content/content.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'public/manifest.json', dest: '.' },
        { src: 'public/icons', dest: '.' },
      ],
    }),
  ],
});
