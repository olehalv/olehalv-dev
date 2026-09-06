import type { Section, SiteSettings } from '../../sanity/types';
import { ContactBlock } from './ContactBlock';
import { EducationBlock } from './EducationBlock';
import { ExperienceBlock } from './ExperienceBlock';
import { HeroBlock } from './HeroBlock';
import { ProjectsBlock } from './ProjectsBlock';
import { RichTextBlock } from './RichTextBlock';
import { SkillsBlock } from './SkillsBlock';

interface SectionRendererProps {
  sections: Section[];
  settings: SiteSettings;
}

export const SectionRenderer = ({ sections, settings }: SectionRendererProps) => (
  <>
    {sections.map((section) => {
      const anchor = section.anchor?.current;

      switch (section._type) {
        case 'heroSection':
          return <HeroBlock key={section._key} section={section} settings={settings} />;
        case 'richTextSection':
          return <RichTextBlock key={section._key} section={section} anchor={anchor} />;
        case 'experienceSection':
          return <ExperienceBlock key={section._key} section={section} anchor={anchor} />;
        case 'educationSection':
          return <EducationBlock key={section._key} section={section} anchor={anchor} />;
        case 'projectsSection':
          return <ProjectsBlock key={section._key} section={section} anchor={anchor} />;
        case 'skillsSection':
          return (
            <SkillsBlock key={section._key} section={section} settings={settings} anchor={anchor} />
          );
        case 'contactSection':
          return (
            <ContactBlock
              key={section._key}
              section={section}
              settings={settings}
              anchor={anchor}
            />
          );
        default:
          return null;
      }
    })}
  </>
);
