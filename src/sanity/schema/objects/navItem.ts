import { defineField, defineType } from 'sanity';

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Links to',
      type: 'string',
      options: {
        list: [
          { title: 'A page on this site', value: 'page' },
          { title: 'A section of the home page', value: 'anchor' },
          { title: 'An external URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'anchor',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === 'page' && !value) return 'Choose a page to link to.';
          return true;
        }),
    }),
    defineField({
      name: 'anchor',
      title: 'Section anchor',
      type: 'string',
      description: 'The anchor of a home page section, without the "#".',
      hidden: ({ parent }) => parent?.linkType !== 'anchor',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === 'anchor' && !value) return 'Enter the section anchor.';
          return true;
        }),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https', 'mailto'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === 'external' && !value) return 'Enter a URL.';
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      anchor: 'anchor',
      url: 'url',
      page: 'page.slug.current',
    },
    prepare: ({
      title,
      linkType,
      anchor,
      url,
      page,
    }: {
      title?: string;
      linkType?: string;
      anchor?: string;
      url?: string;
      page?: string;
    }) => ({
      title,
      subtitle:
        linkType === 'page' ? `/${page ?? '…'}` : linkType === 'anchor' ? `#${anchor ?? '…'}` : url,
    }),
  },
});
