import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
    {children}
  </a>
);
