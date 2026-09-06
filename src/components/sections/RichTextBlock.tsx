import type { RichTextSection } from '../../sanity/types';
import { Prose } from '../Prose';
import { Section } from '../Section';

interface RichTextBlockProps {
  section: RichTextSection;
  anchor?: string;
}

export const RichTextBlock = ({ section, anchor }: RichTextBlockProps) => {
  if (!section.heading) {
    return (
      <div className="shell" id={anchor}>
        <Prose value={section.body} />
      </div>
    );
  }

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <Prose value={section.body} />
    </Section>
  );
};
