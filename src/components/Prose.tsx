import type { PortableTextBlock } from '@portabletext/react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';

import { ExternalLink } from './ExternalLink';

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      return <ExternalLink href={href}>{children}</ExternalLink>;
    },
  },
};

interface ProseProps {
  value?: PortableTextBlock[];
}

export const Prose = ({ value }: ProseProps) => {
  if (!value?.length) return null;

  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
};
