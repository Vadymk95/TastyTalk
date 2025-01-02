import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Loader } from '@root/components/ui/Loader';
import { AppRouter } from '@root/router/AppRouter';
import { routes } from '@root/router/routes';
import { useLanguageStore } from '@root/store/languageStore';

export const Main: FC = () => {
    const location = useLocation();
    const { loading: languageLoading } = useLanguageStore();
    const centeredPages = [
        routes.auth,
        routes.emailVerification,
        routes.phoneNumberVerification,
        routes.greeting,
        routes.recipesCreate
    ];
    const shouldDisplayCenter = centeredPages.includes(location.pathname);
    const centered = shouldDisplayCenter ? 'flex-all-center duration-300' : '';

    return (
        <main className={`main-content container ${centered}`}>
            {languageLoading ? <Loader /> : <AppRouter />}
        </main>
    );
};
