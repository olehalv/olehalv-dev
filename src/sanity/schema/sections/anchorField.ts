import { defineField } from 'sanity';

export const anchorField = defineField({
  name: 'anchor',
  title: 'Anchor',
  type: 'slug',
  description: 'Used for in-page links, e.g. "projects" makes the section reachable at #projects.',
  options: { source: 'heading', maxLength: 40 },
});

export const headingField = defineField({
  name: 'heading',
  title: 'Heading',
  type: 'string',
  validation: (rule) => rule.required(),
});
