import { defineField, defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Matches an icon in the site. Falls back to the first letter of the label.',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Bluesky', value: 'bluesky' },
          { title: 'Mastodon', value: 'mastodon' },
          { title: 'X', value: 'x' },
          { title: 'Email', value: 'email' },
          { title: 'Link', value: 'link' },
        ],
      },
      initialValue: 'link',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' },
  },
});
