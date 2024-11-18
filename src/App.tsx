import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, Main } from '@root/components/layout';
import { routes } from '@root/router/routes';

export const App: FC = () => {
    const location = useLocation();
    const backgroundImgPages = [
        routes.auth,
        routes.emailVerification,
        routes.greeting
    ];
    const shouldDisplayBackground = backgroundImgPages.includes(
        location.pathname
    );

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
