import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore'; // Импорт вашего Zustand стора

interface PrivateRouteProps {
    element: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
    const user = useAuthStore((state) => state.user);

    return user ? element : <Navigate to={routes.auth} />;
};
