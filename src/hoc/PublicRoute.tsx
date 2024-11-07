import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

interface PublicRouteProps {
    element: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ element }) => {
    const { user, isRegistered } = useAuthStore();

    return user && isRegistered ? <Navigate to={routes.home} /> : element;
};
