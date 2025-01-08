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

    if (!initialized) {
        return <Loader />;
    }

    if (
        location.pathname === routes.emailVerification &&
        userProfile?.verified
    ) {
        return <Navigate to={routes.home} />;
    }

    if (location.pathname === routes.phoneNumberVerification) {
        const shouldShowVerificationPhoneNumber =
            (!userProfile?.verified &&
                (userProfile?.phoneNumber ||
                    userProfile?.verificationMethod === 'phone')) ||
            (userProfile?.verificationMethod === 'email' &&
                userProfile?.phoneNumber);

        if (!shouldShowVerificationPhoneNumber) {
            return <Navigate to={routes.home} />;
        }
    }

    if (
        protectedRoutesForRegistered.includes(location.pathname) &&
        !isRegistered
    ) {
        return <Navigate to={routes.home} />;
    }

    if (
        protectedRoutesForVerified.includes(location.pathname) &&
        !userProfile?.verified
    ) {
        return <Navigate to={routes.home} />;
    }

    if (protectedRoutesForPaid.includes(location.pathname) && !hasPlan) {
        return <Navigate to={routes.home} />;
    }

    if (protectedRoutesForStandard.includes(location.pathname) && !isStandard) {
        return <Navigate to={routes.home} />;
    }

    return user ? element : <Navigate to={routes.auth} />;
};
