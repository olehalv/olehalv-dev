import { defineField, defineType } from 'sanity';

export const skillGroup = defineType({
  name: 'skillGroup',
  title: 'Skill group',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'For example "Languages", "Frontend" or "Platform".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'category', items: 'items' },
    prepare: ({ title, items }: { title?: string; items?: string[] }) => ({
      title,
      subtitle: items?.join(', '),
    }),
  },
});
