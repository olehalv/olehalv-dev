import type { ProjectsSection } from '../../sanity/types';
import { ProjectGrid } from '../ProjectGrid';
import { Section } from '../Section';

interface ProjectsBlockProps {
  section: ProjectsSection;
  anchor?: string;
}

export const ProjectsBlock = ({ section, anchor }: ProjectsBlockProps) => {
  const items = section.limit ? section.projects?.slice(0, section.limit) : section.projects;

  if (!items?.length) return null;

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <ProjectGrid items={items} />
    </Section>
  );
};
