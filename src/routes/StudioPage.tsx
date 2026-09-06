import { Studio } from 'sanity';

import config from '../../sanity.config';
import { isSanityConfigured } from '../sanity/env';

const StudioPage = () => {
  if (!isSanityConfigured) {
    return (
      <div className="centered-state">
        <h1>Studio not configured</h1>
        <p>
          Set <code>VITE_SANITY_PROJECT_ID</code> in <code>.env.local</code>, then restart the dev
          server.
        </p>
      </div>
    );
  }

  return (
    <div className="studio">
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;
