import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, Main } from '@root/components/layout';
import { routes } from '@root/router/routes';
import { useAuthStore, useLanguageStore } from '@root/store';

export const App: FC = () => {
    const location = useLocation();
    const { user } = useAuthStore();
    const backgroundImgPages = [
        routes.auth,
        routes.emailVerification,
        routes.greeting
    ];
    const shouldDisplayBackground = backgroundImgPages.includes(
        location.pathname
    );

    const { loadLanguage } = useLanguageStore();

    useEffect(() => {
        if (user) {
            loadLanguage();
        }
    }, [user, loadLanguage]);

    return (
        <div
            className={`app-container app-container--${shouldDisplayBackground ? 'img' : 'bg'}`}
        >
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
