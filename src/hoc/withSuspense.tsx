import { Loader } from '@root/components';
import { ReactNode, Suspense } from 'react';

export const withSuspense = (element: ReactNode) => (
    <Suspense fallback={<Loader />}>{element}</Suspense>
);
