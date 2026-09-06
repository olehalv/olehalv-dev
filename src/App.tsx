import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { studioBasePath } from './sanity/env';

const HomePage = lazy(() => import('./routes/HomePage'));
const PageRoute = lazy(() => import('./routes/PageRoute'));
const StudioPage = lazy(() => import('./routes/StudioPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));

const Loading = () => (
  <div className="centered-state" role="status">
    Loading…
  </div>
);

export const App = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={`${studioBasePath}/*`} element={<StudioPage />} />
      <Route path="/:slug" element={<PageRoute />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
