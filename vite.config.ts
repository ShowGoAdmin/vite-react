import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/', // Base path for deployment
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Set the development server port
    open: true, // Automatically opens the browser
  },
  build: {
    outDir: 'dist', // Output directory for the production build
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure entry point is correct
    },
  },
  preview: {
    port: 5173, // Specify a port for the preview server
  },
});
