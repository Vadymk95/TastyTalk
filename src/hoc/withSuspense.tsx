import { ReactNode, Suspense } from 'react';

import { Loader } from '@root/components/ui';

export const withSuspense = (element: ReactNode) => (
    <Suspense fallback={<Loader />}>{element}</Suspense>
);
