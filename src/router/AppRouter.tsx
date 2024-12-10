import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute, withSuspense } from '@root/hoc';
import {
    AuthPage,
    CreateMealsPlanPage,
    CreateRecipePage,
    EmailVerificationPage,
    FollowersPage,
    FollowingPage,
    GreetingPage,
    HomePage,
    MealsPlanPage,
    NotFoundPage,
    PricingPage,
    ProfilePage,
    ProfileSettingsPage,
    SearchProfilePage
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
                path={routes.pricing}
                element={
                    <PublicRoute element={withSuspense(<PricingPage />)} />
                }
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
                path={routes.greeting}
                element={
                    <PrivateRoute element={withSuspense(<GreetingPage />)} />
                }
            />

            <Route
                path={routes.profile}
                element={
                    <PrivateRoute element={withSuspense(<ProfilePage />)} />
                }
            />

            <Route
                path={routes.mealsPlan}
                element={
                    <PrivateRoute element={withSuspense(<MealsPlanPage />)} />
                }
            />

            <Route
                path={routes.recipes}
                element={<PrivateRoute element={withSuspense(<HomePage />)} />}
            />

            <Route
                path={routes.notFound}
                element={withSuspense(<NotFoundPage />)}
            />

            <Route
                path={routes.recipesCreate}
                element={
                    <PrivateRoute
                        element={withSuspense(<CreateRecipePage />)}
                    />
                }
            />

            <Route
                path={routes.mealsPlanCreate}
                element={
                    <PrivateRoute
                        element={withSuspense(<CreateMealsPlanPage />)}
                    />
                }
            />

            <Route
                path={routes.settings}
                element={
                    <PrivateRoute
                        element={withSuspense(<ProfileSettingsPage />)}
                    />
                }
            />

            <Route
                path={routes.followers}
                element={
                    <PrivateRoute element={withSuspense(<FollowersPage />)} />
                }
            />

            <Route
                path={routes.following}
                element={
                    <PrivateRoute element={withSuspense(<FollowingPage />)} />
                }
            />

            <Route
                path={routes.searchProfiles}
                element={
                    <PrivateRoute
                        element={withSuspense(<SearchProfilePage />)}
                    />
                }
            />
        </Routes>
    );
};
