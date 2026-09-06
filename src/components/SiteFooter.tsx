import { Link } from 'react-router';

interface SiteFooterProps {
  name: string;
  note?: string;
}

export const SiteFooter = ({ name, note }: SiteFooterProps) => (
  <footer className="site-footer">
    <div className="shell site-footer__inner">
      <span>
        © {new Date().getFullYear()} {name}
      </span>
      <span>{note ?? <Link to="/studio">Studio</Link>}</span>
    </div>
  </footer>
);
