import { defineCliConfig } from 'sanity/cli';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), 'VITE_');

export default defineCliConfig({
  api: {
    projectId: env.VITE_SANITY_PROJECT_ID,
    dataset: env.VITE_SANITY_DATASET ?? 'production',
  },
});
