import { defineArrayMember, defineField, defineType } from 'sanity';

import { sectionTypeNames } from '../sections';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'The URL path, e.g. "about" becomes /about.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current;
          if (current === 'studio') return 'The /studio path is reserved for the Studio.';
          return true;
        }),
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      group: 'content',
      description: 'Adds this page to the header navigation automatically.',
      initialValue: false,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: sectionTypeNames.map((type) => defineArrayMember({ type })),
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }: { title?: string; slug?: string }) => ({
      title,
      subtitle: slug ? `/${slug}` : 'No slug set',
    }),
  },
});
