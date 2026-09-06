import type { SiteSettings, SkillsSection } from '../../sanity/types';
import { Section } from '../Section';
import { SkillGroups } from '../SkillGroups';

interface SkillsBlockProps {
  section: SkillsSection;
  settings: SiteSettings;
  anchor?: string;
}

export const SkillsBlock = ({ section, settings, anchor }: SkillsBlockProps) => {
  if (!settings.skills?.length) return null;

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <SkillGroups groups={settings.skills} />
    </Section>
  );
};
