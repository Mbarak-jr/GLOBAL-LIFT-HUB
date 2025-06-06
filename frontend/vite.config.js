import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 alpha plugin
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Local backend API proxy
    },
  },
  build: {
    outDir: 'dist', // Default for Vite, but explicit is good
    emptyOutDir: true, // Clears old build files before rebuilding
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit for large chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'redux', 'react-redux', 'axios'], // Chunking some large dependencies into separate files
        },
      },
    },
  },
  base: '/', // Keep '/' for root domain, or change if deploying to subpath
});
