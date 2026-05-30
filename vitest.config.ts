import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['dist/**', 'node_modules/**', 'physiorehab-protocols-database/**'],
  },
});
