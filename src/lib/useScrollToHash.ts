import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useScrollToHash = (ready: boolean) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!ready) return;

    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, ready]);
};
