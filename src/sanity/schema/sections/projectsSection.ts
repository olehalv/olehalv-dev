import { defineArrayMember, defineField, defineType } from 'sanity';

import { anchorField, headingField } from './anchorField';

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Projects',
  type: 'object',
  fields: [
    headingField,
    anchorField,
    defineField({
      name: 'source',
      title: 'Which projects',
      type: 'string',
      options: {
        list: [
          { title: 'All projects', value: 'all' },
          { title: 'Featured only', value: 'featured' },
          { title: 'Hand-picked', value: 'selected' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'selected',
      title: 'Projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      hidden: ({ parent }) => parent?.source !== 'selected',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { source?: string } | undefined;
          if (parent?.source === 'selected' && !value?.length) return 'Pick at least one project.';
          return true;
        }),
    }),
    defineField({
      name: 'limit',
      title: 'Maximum entries',
      type: 'number',
      description: 'Leave empty to show every match.',
      hidden: ({ parent }) => parent?.source === 'selected',
      validation: (rule) => rule.min(1).integer(),
    }),
  ],
  preview: {
    select: { title: 'heading', source: 'source' },
    prepare: ({ title, source }: { title?: string; source?: string }) => ({
      title: title ?? 'Projects',
      subtitle:
        source === 'selected'
          ? 'Hand-picked'
          : source === 'featured'
            ? 'Featured only'
            : 'All projects',
    }),
  },
});
