import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';

import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export const urlFor = (source: SanityImageSource) => builder?.image(source) ?? null;
