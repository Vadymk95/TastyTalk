import { withSuspense } from '@root/hoc/withSuspense';
import { AuthPage, HomePage, NotFoundPage } from '@root/pages/';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.auth} element={withSuspense(<AuthPage />)} />
            <Route
                path={routes.notFound}
                element={withSuspense(<NotFoundPage />)}
            />
        </Routes>
    );
};
