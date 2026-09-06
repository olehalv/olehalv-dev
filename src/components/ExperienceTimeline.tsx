import { formatDateRange } from '../lib/date';
import type { Experience } from '../sanity/types';
import { ExternalLink } from './ExternalLink';
import { Tags } from './Tags';

interface ExperienceTimelineProps {
  items: Experience[];
}

export const ExperienceTimeline = ({ items }: ExperienceTimelineProps) => (
  <ol className="timeline">
    {items.map((item) => (
      <li key={item._id} className="timeline__item">
        <span className="timeline__dates">
          {formatDateRange(item.startDate, item.endDate, item.current)}
        </span>

        <div className="timeline__body">
          <h3 className="timeline__role">{item.role}</h3>
          <p className="timeline__company">
            {item.url ? <ExternalLink href={item.url}>{item.company}</ExternalLink> : item.company}
            {item.location && <span className="timeline__location"> · {item.location}</span>}
          </p>
          {item.description && <p className="timeline__description">{item.description}</p>}
          <Tags items={item.technologies} label={`Technologies used at ${item.company}`} />
        </div>
      </li>
    ))}
  </ol>
);
