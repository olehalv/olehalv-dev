import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId, studioBasePath } from './src/sanity/env';
import { schemaTypes } from './src/sanity/schema';
import { singletonTypes, structure } from './src/sanity/structure';

export default defineConfig({
  name: 'olehalv-dev',
  title: 'olehalv.dev',
  basePath: studioBasePath,

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : actions,
  },
});
