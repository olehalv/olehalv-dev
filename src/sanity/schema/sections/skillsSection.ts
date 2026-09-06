import { defineType } from 'sanity';

import { anchorField, headingField } from './anchorField';

export const skillsSection = defineType({
  name: 'skillsSection',
  title: 'Skills',
  type: 'object',
  fields: [headingField, anchorField],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: { title?: string }) => ({
      title: title ?? 'Skills',
      subtitle: 'Skill groups from Site settings',
    }),
  },
});
