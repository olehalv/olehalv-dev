import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'url', title: 'Company URL', type: 'url' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'current',
      title: 'Current position',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      hidden: ({ parent }) => Boolean(parent?.current),
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const parent = context.parent as { current?: boolean; startDate?: string } | undefined;
          if (parent?.current) return true;
          if (!endDate) return 'Set an end date, or mark this as your current position.';
          if (parent?.startDate && endDate < parent.startDate) {
            return 'End date cannot be before the start date.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Manual order',
      type: 'number',
      description:
        'Lower numbers appear first. Leave empty to fall back to start date, newest first.',
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'startDate', direction: 'desc' },
      ],
    },
    {
      title: 'Most recent first',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'role',
      company: 'company',
      startDate: 'startDate',
      current: 'current',
    },
    prepare: ({
      title,
      company,
      startDate,
      current,
    }: {
      title?: string;
      company?: string;
      startDate?: string;
      current?: boolean;
    }) => ({
      title: `${title ?? 'Untitled'} · ${company ?? ''}`.trim(),
      subtitle: [startDate?.slice(0, 7), current ? 'present' : null].filter(Boolean).join(' → '),
    }),
  },
});
