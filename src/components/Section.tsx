import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="shell" aria-labelledby={`${id}-title`}>
    <div className="section__heading">
      <h2 id={`${id}-title`} className="section__title">
        {title}
      </h2>
      <span className="section__rule" aria-hidden="true" />
    </div>
    {children}
  </section>
);
