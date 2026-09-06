import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headingOverride',
      title: 'Heading override',
      type: 'string',
      description: 'Leave empty to use the name from Site settings.',
    }),
    defineField({
      name: 'taglineOverride',
      title: 'Tagline override',
      type: 'text',
      rows: 3,
      description: 'Leave empty to use the tagline from Site settings.',
    }),
    defineField({
      name: 'showAvailability',
      title: 'Show availability badge',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showLinks',
      title: 'Show social links',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { heading: 'headingOverride' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: 'Hero',
      subtitle: heading ?? 'Name and tagline from Site settings',
    }),
  },
});
