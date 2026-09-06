import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'School or institution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qualification',
      title: 'Programme or qualification',
      type: 'string',
      description: 'For example "VG2, Information technology".',
    }),
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
      title: 'Currently studying here',
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
          if (!endDate) return 'Set an end date, or mark this as ongoing.';
          if (parent?.startDate && endDate < parent.startDate) {
            return 'End date cannot be before the start date.';
          }
          return true;
        }),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  orderings: [
    {
      title: 'Most recent first',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'institution',
      qualification: 'qualification',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare: ({
      title,
      qualification,
      startDate,
      endDate,
    }: {
      title?: string;
      qualification?: string;
      startDate?: string;
      endDate?: string;
    }) => ({
      title,
      subtitle: [
        qualification,
        [startDate?.slice(0, 4), endDate?.slice(0, 4)].filter(Boolean).join(' - '),
      ]
        .filter(Boolean)
        .join(' | '),
    }),
  },
});
