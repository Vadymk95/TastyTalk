import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { IFrameWarning } from '@root/components/common';
import { Footer, Header, Main } from '@root/components/layout';
import { routes } from '@root/router/routes';
import { useAuthStore, useLanguageStore } from '@root/store';
import { useFooterPosition } from './hooks';

export const App: FC = () => {
    const location = useLocation();
    const { user, handleRedirectResult } = useAuthStore();
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

    useEffect(() => {
        handleRedirectResult();
    }, [handleRedirectResult]);

    useFooterPosition();

    console.log(11);

    return (
        <div
            className={`app-container app-container--${shouldDisplayBackground ? 'img' : 'bg'}`}
        >
            <IFrameWarning />
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
