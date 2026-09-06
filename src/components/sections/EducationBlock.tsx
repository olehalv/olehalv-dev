import type { EducationSection } from '../../sanity/types';
import { EducationList } from '../EducationList';
import { Section } from '../Section';

interface EducationBlockProps {
  section: EducationSection;
  anchor?: string;
}

export const EducationBlock = ({ section, anchor }: EducationBlockProps) => {
  const items = section.limit ? section.items?.slice(0, section.limit) : section.items;

  if (!items?.length) return null;

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <EducationList items={items} />
    </Section>
  );
};
