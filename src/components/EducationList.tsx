import { formatDateRange } from '../lib/date';
import type { Education } from '../sanity/types';

interface EducationListProps {
  items: Education[];
}

export const EducationList = ({ items }: EducationListProps) => (
  <ol className="timeline">
    {items.map((item) => (
      <li key={item._id} className="timeline__item">
        <span className="timeline__dates">
          {formatDateRange(item.startDate, item.endDate, item.current)}
        </span>

        <div className="timeline__body">
          <h3 className="timeline__role">{item.institution}</h3>
          {(item.qualification || item.location) && (
            <p className="timeline__company">
              {item.qualification}
              {item.qualification && item.location ? ' · ' : ''}
              {item.location}
            </p>
          )}
          {item.description && <p className="timeline__description">{item.description}</p>}
        </div>
      </li>
    ))}
  </ol>
);
