import { AppRouter } from '@root/router/AppRouter';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../../router/routes';

export const Main: FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === routes.auth;

    return (
        <main
            className={`main-content container ${isAuthPage ? 'flex-all-center' : ''}`}
        >
            <AppRouter />
        </main>
    );
};
