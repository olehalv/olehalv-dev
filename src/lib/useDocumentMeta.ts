import { useEffect } from 'react';

import type { Seo } from '../sanity/types';

const setMeta = (name: string, content: string | null) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!content) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
};

export const useDocumentMeta = (title: string, seo?: Seo) => {
  const metaTitle = seo?.metaTitle ?? title;
  const description = seo?.metaDescription ?? null;
  const noIndex = seo?.noIndex ?? false;

  useEffect(() => {
    document.title = metaTitle;
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex' : null);
  }, [metaTitle, description, noIndex]);
};
