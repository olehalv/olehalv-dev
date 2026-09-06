import { defineArrayMember, defineField, defineType } from 'sanity';

import { anchorField, headingField } from './anchorField';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  fields: [
    headingField,
    anchorField,
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] })],
    }),
    defineField({
      name: 'showEmail',
      title: 'Show email address',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show social links',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: { title?: string }) => ({
      title: title ?? 'Contact',
      subtitle: 'Contact details from Site settings',
    }),
  },
});
