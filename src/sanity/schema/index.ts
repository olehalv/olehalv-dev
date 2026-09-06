import type { SchemaTypeDefinition } from 'sanity';

import { education } from './documents/education';
import { experience } from './documents/experience';
import { homePage } from './documents/homePage';
import { page } from './documents/page';
import { project } from './documents/project';
import { siteSettings } from './documents/siteSettings';
import { navItem } from './objects/navItem';
import { seo } from './objects/seo';
import { skillGroup } from './objects/skillGroup';
import { socialLink } from './objects/socialLink';
import { sectionTypes } from './sections';

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  page,
  experience,
  education,
  project,
  socialLink,
  skillGroup,
  navItem,
  seo,
  ...sectionTypes,
];
