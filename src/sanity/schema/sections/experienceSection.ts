import { defineField, defineType } from 'sanity';

import { anchorField, headingField } from './anchorField';

export const experienceSection = defineType({
  name: 'experienceSection',
  title: 'Experience',
  type: 'object',
  fields: [
    headingField,
    anchorField,
    defineField({
      name: 'limit',
      title: 'Maximum entries',
      type: 'number',
      description: 'Leave empty to show every entry.',
      validation: (rule) => rule.min(1).integer(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: { title?: string }) => ({
      title: title ?? 'Experience',
      subtitle: 'Experience entries',
    }),
  },
});
