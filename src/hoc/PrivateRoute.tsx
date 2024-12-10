import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

interface PrivateRouteProps {
    element: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
    const location = useLocation();
    const { user, initialized, isRegistered, isEmailVerified } = useAuthStore();
    const protectedRoutesForRegistered = [
        routes.profile,
        routes.settings,
        routes.greeting,
        routes.emailVerification
    ];
    const protectedRoutesForVerified = [
        routes.mealsPlanCreate,
        routes.recipesCreate,
        routes.followers,
        routes.following,
        routes.searchProfiles
    ];

    if (!initialized) {
        return <Loader />;
    }

    if (location.pathname === routes.emailVerification && isEmailVerified) {
        return <Navigate to={routes.home} />;
    }

    if (
        protectedRoutesForRegistered.includes(location.pathname) &&
        !isRegistered
    ) {
        return <Navigate to={routes.home} />;
    }

    if (
        protectedRoutesForVerified.includes(location.pathname) &&
        !isEmailVerified
    ) {
        return <Navigate to={routes.home} />;
    }

    return user ? element : <Navigate to={routes.auth} />;
};
