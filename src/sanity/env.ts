export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '';
export const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2026-09-06';

export const studioBasePath = '/studio';

export const isSanityConfigured = projectId.trim().length > 0;
