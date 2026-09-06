import { contactSection } from './contactSection';
import { educationSection } from './educationSection';
import { experienceSection } from './experienceSection';
import { heroSection } from './heroSection';
import { projectsSection } from './projectsSection';
import { richTextSection } from './richTextSection';
import { skillsSection } from './skillsSection';

export const sectionTypes = [
  heroSection,
  richTextSection,
  experienceSection,
  educationSection,
  projectsSection,
  skillsSection,
  contactSection,
];

export const sectionTypeNames = sectionTypes.map((type) => type.name);
