import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'skills', title: 'Skills' },
    { name: 'navigation', title: 'Navigation' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'profile',
      description: 'Shown under your name, e.g. "Full-stack developer".',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      group: 'profile',
      description: 'One or two sentences at the top of the page.',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'availableForWork',
      title: 'Available for work',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Availability note',
      type: 'string',
      group: 'contact',
      description: 'Shown next to the availability badge.',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Résumé URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'skills',
      of: [defineArrayMember({ type: 'skillGroup' })],
    }),
    defineField({
      name: 'navigation',
      title: 'Header navigation',
      type: 'array',
      group: 'navigation',
      description:
        'Leave empty to build the navigation automatically from the home page sections and any page marked "Show in navigation".',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note',
      type: 'string',
      group: 'navigation',
      description: 'Shown on the right-hand side of the footer.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
});
