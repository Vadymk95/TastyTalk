import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { AppRouter } from '@root/router/AppRouter';
import { routes } from '@root/router/routes';

export const Main: FC = () => {
    const location = useLocation();
    const centeredPages = [
        routes.auth,
        routes.emailVerification,
        routes.greeting
    ];
    const shouldDisplayCenter = centeredPages.includes(location.pathname);

    return (
        <main
            className={`main-content container ${shouldDisplayCenter ? 'flex-all-center duration-300' : 'backdrop-bg'}`}
        >
            <AppRouter />
        </main>
    );
};
