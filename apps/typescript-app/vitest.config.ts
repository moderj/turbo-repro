import { defineConfig } from 'vitest/config';

const setupFiles = process.env.NODE_ENV !== 'ci' ? ['./test/load-env'] : [];

export default defineConfig({
  test: {
    coverage: { reporter: ['text', 'html', 'clover', 'json'] },
    setupFiles,
  },
});
