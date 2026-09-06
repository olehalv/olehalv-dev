import type { PageDocument, SiteSettings } from './types';

export const fallbackSettings: SiteSettings = {
  name: 'Ole Morten Halvorsen',
  role: 'Full-stack developer',
  location: 'Norway',
  tagline: 'Full-stack developer building pragmatic, long-lived software for the public sector.',
  socialLinks: [
    {
      _key: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/olehalv/',
      icon: 'linkedin',
    },
  ],
};

export const fallbackHomePage: PageDocument = {
  _id: 'fallback-home',
  title: 'Home',
  sections: [
    {
      _key: 'fallback-hero',
      _type: 'heroSection',
      showAvailability: true,
      showLinks: true,
    },
  ],
};
