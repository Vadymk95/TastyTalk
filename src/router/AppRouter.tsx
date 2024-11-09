import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute, withSuspense } from '@root/hoc';
import {
    AuthPage,
    EmailVerificationPage,
    HomePage,
    NotFoundPage,
    ProfilePage
} from '@root/pages/';
import { routes } from '@root/router/routes';

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<HomePage />} />
            <Route
                path={routes.auth}
                element={<PublicRoute element={withSuspense(<AuthPage />)} />}
            />
            <Route
                path={routes.emailVerification}
                element={
                    <PrivateRoute
                        element={withSuspense(<EmailVerificationPage />)}
                    />
                }
            />
            <Route
                path={routes.profile}
                element={
                    <PrivateRoute element={withSuspense(<ProfilePage />)} />
                }
            />
            <Route
                path={routes.notFound}
                element={withSuspense(<NotFoundPage />)}
            />
        </Routes>
    );
};
