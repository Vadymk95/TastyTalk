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
    const {
        user,
        userProfile,
        initialized,
        isRegistered,
        hasPaidPlan,
        isStandardPlan
    } = useAuthStore();
    const hasPlan = hasPaidPlan();
    const isStandard = isStandardPlan();
    const protectedRoutesForRegistered = [
        routes.settings,
        routes.greeting,
        routes.emailVerification,
        routes.phoneNumberVerification
    ];
    const protectedRoutesForVerified = [
        routes.recipesCreate,
        routes.followers,
        routes.following,
        routes.searchProfiles
    ];
    const protectedRoutesForPaid = [routes.mealsPlan];
    const protectedRoutesForStandard = [routes.mealsPlanCreate];

    console.log(userProfile);

    if (!initialized) {
        console.log(1);
        return <Loader />;
    }

    if (
        (location.pathname === routes.emailVerification ||
            location.pathname === routes.phoneNumberVerification) &&
        userProfile?.verified
    ) {
        console.log(2);
        return <Navigate to={routes.home} />;
    }

    if (
        protectedRoutesForRegistered.includes(location.pathname) &&
        !isRegistered
    ) {
        console.log(3);
        return <Navigate to={routes.home} />;
    }

    if (
        protectedRoutesForVerified.includes(location.pathname) &&
        !userProfile?.verified
    ) {
        console.log(4);
        return <Navigate to={routes.home} />;
    }

    if (protectedRoutesForPaid.includes(location.pathname) && !hasPlan) {
        console.log(5);
        return <Navigate to={routes.home} />;
    }

    if (protectedRoutesForStandard.includes(location.pathname) && !isStandard) {
        console.log(6);
        return <Navigate to={routes.home} />;
    }

    return user ? element : <Navigate to={routes.auth} />;
};
