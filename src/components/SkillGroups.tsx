import type { SkillGroup } from '../sanity/types';
import { Tags } from './Tags';

interface SkillGroupsProps {
  groups: SkillGroup[];
}

export const SkillGroups = ({ groups }: SkillGroupsProps) => (
  <div className="skill-groups">
    {groups.map((group) => (
      <section key={group._key} className="skill-group">
        <h3 className="skill-group__title">{group.category}</h3>
        <Tags items={group.items} label={group.category} />
      </section>
    ))}
  </div>
);
