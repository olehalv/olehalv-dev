import { urlFor } from '../sanity/client';
import type { Project } from '../sanity/types';
import { ExternalLink } from './ExternalLink';
import { Tags } from './Tags';

interface ProjectGridProps {
  items: Project[];
}

export const ProjectGrid = ({ items }: ProjectGridProps) => (
  <ul className="project-grid">
    {items.map((project) => {
      const imageUrl = project.image
        ? urlFor(project.image)?.width(640).height(360).fit('crop').auto('format').url()
        : null;

      return (
        <li key={project._id} className="project-card">
          {imageUrl && (
            <img
              className="project-card__media"
              src={imageUrl}
              alt={project.image?.alt ?? ''}
              loading="lazy"
              width={640}
              height={360}
            />
          )}

          {project.featured && <span className="project-card__badge">Featured</span>}

          <div className="project-card__header">
            <h3 className="project-card__title">
              {project.url ? (
                <ExternalLink href={project.url}>{project.title}</ExternalLink>
              ) : (
                project.title
              )}
            </h3>
            {project.year && <span className="project-card__year">{project.year}</span>}
          </div>

          <p className="project-card__summary">{project.summary}</p>

          <Tags items={project.technologies} label={`Technologies used in ${project.title}`} />

          {(project.url || project.repository) && (
            <div className="project-card__links">
              {project.url && <ExternalLink href={project.url}>Live ↗</ExternalLink>}
              {project.repository && (
                <ExternalLink href={project.repository}>Source ↗</ExternalLink>
              )}
            </div>
          )}
        </li>
      );
    })}
  </ul>
);
