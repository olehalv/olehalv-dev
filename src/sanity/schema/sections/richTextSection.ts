import { defineArrayMember, defineField, defineType } from 'sanity';

import { anchorField } from './anchorField';

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Leave empty to render the text without a section heading.',
    }),
    anchorField,
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string' })],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading', body: 'body' },
    prepare: ({
      heading,
      body,
    }: {
      heading?: string;
      body?: { children?: { text?: string }[] }[];
    }) => ({
      title: heading ?? 'Rich text',
      subtitle: body?.[0]?.children?.map((c) => c.text).join('') ?? '',
    }),
  },
});
