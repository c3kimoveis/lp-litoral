import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Permite acesso externo (necessário para Docker)
    port: parseInt(process.env.VITE_PORT || '5173'),
    strictPort: true, // Falha se a porta já estiver em uso
    watch: {
      usePolling: true, // Necessário para hot-reload funcionar em Docker
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      /* pass your config */
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 75 },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
