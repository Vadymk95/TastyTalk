import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { AppRouter } from '@root/router/AppRouter';
import { routes } from '@root/router/routes';

export const Main: FC = () => {
    const location = useLocation();
    const centeredPages = [
        routes.auth,
        routes.emailVerification,
        routes.greeting,
        routes.recipesCreate
    ];
    const shouldDisplayCenter = centeredPages.includes(location.pathname);
    const centered = shouldDisplayCenter ? 'flex-all-center duration-300' : '';

    //bg-styles - backdrop-bg bg-gradient-main
    return (
        <main className={`main-content container ${centered}`}>
            <AppRouter />
        </main>
    );
};
