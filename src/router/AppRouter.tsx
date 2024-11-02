import { HomePage, NotFoundPage } from '@root/pages/';
import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<HomePage />} />

            <Suspense fallback={<div>Loading...</div>}>
                <Route path={routes.notFound} element={<NotFoundPage />} />
            </Suspense>
        </Routes>
    );
};
