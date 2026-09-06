import { defineArrayMember, defineField, defineType } from 'sanity';

import { sectionTypeNames } from '../sections';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'content',
      description: 'Only shown inside the Studio.',
      initialValue: 'Home',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      description: 'Drag to reorder. Each section becomes a block on the page.',
      of: sectionTypeNames.map((type) => defineArrayMember({ type })),
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', sections: 'sections' },
    prepare: ({ title, sections }: { title?: string; sections?: unknown[] }) => ({
      title: title ?? 'Home',
      subtitle: `${sections?.length ?? 0} section${sections?.length === 1 ? '' : 's'}`,
    }),
  },
});
