import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@root/components';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore'; // Импорт вашего Zustand стора

interface PrivateRouteProps {
    element: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
    const location = useLocation();
    const { user, initialized, isEmailVerified } = useAuthStore();
    const protectedRoutes = [
        routes.emailVerification,
        routes.mealsPlanCreate,
        routes.recipesCreate,
        routes.settings
    ];

    if (!initialized) {
        return <Loader />;
    }

    if (protectedRoutes.includes(location.pathname) && isEmailVerified) {
        return <Navigate to={routes.home} />;
    }

    return user ? element : <Navigate to={routes.auth} />;
};
