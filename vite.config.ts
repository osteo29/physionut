import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Back-compat for code that references process.env (client-side)
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY),
      // Ensure Vite exposes the key in the client bundle
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || ''),
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'react-core';
            }

            if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
              return 'router-vendor';
            }

            if (id.includes('node_modules/motion')) {
              return 'motion-vendor';
            }

            if (id.includes('node_modules/chart.js') || id.includes('node_modules/react-chartjs-2')) {
              return 'chart-vendor';
            }

            if (id.includes('node_modules/lucide-react')) {
              return 'icon-vendor';
            }

            if (id.includes('node_modules/@supabase')) {
              return 'supabase-vendor';
            }

            if (id.includes('node_modules/html2canvas')) {
              return 'html2canvas-renderer';
            }

            if (id.includes('node_modules/jspdf')) {
              return 'jspdf-renderer';
            }

            if (id.includes('node_modules/qrcode')) {
              return 'pdf-branding';
            }

            if (id.includes('node_modules/@google/genai')) {
              return 'ai-vendor';
            }

            if (
              id.includes('/src/services/translations.ts') ||
              id.includes('/src/services/foodData.ts') ||
              id.includes('/src/services/injuryDatabase.ts')
            ) {
              return 'app-data';
            }

            if (
              id.includes('/src/services/physioNutritionLogic.ts') ||
              id.includes('/src/logic/physioNutritionLogic.ts') ||
              id.includes('/src/services/calculators.ts')
            ) {
              return 'health-logic';
            }

            return undefined;
          },
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR configuration for development
      hmr: {
        host: 'localhost',
        port: 3000,
        protocol: 'ws',
      },
    },
  };
});
