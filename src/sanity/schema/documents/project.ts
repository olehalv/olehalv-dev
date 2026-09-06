import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the project card.',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        }),
      ],
    }),
    defineField({ name: 'url', title: 'Live URL', type: 'url' }),
    defineField({ name: 'repository', title: 'Repository URL', type: 'url' }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.min(1990).max(2100).integer(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Manual order',
      type: 'number',
      description: 'Lower numbers sort first. Leave empty to sort by year.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'image' },
  },
});
