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

    if (!initialized) {
        return <Loader />;
    }

    if (location.pathname === routes.emailVerification && isEmailVerified) {
        return <Navigate to={routes.home} />;
    }

    return user ? element : <Navigate to={routes.auth} />;
};
