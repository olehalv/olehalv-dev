import type { ExperienceSection } from '../../sanity/types';
import { ExperienceTimeline } from '../ExperienceTimeline';
import { Section } from '../Section';

interface ExperienceBlockProps {
  section: ExperienceSection;
  anchor?: string;
}

export const ExperienceBlock = ({ section, anchor }: ExperienceBlockProps) => {
  const items = section.limit ? section.items?.slice(0, section.limit) : section.items;

  if (!items?.length) return null;

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <ExperienceTimeline items={items} />
    </Section>
  );
};
