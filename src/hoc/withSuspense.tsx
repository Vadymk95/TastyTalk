import { ReactNode, Suspense } from 'react';

export const withSuspense = (element: ReactNode) => (
    <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);
