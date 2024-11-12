import { FC } from 'react';

import { Footer, Header, Main } from '@root/components';

export const App: FC = () => {
    return (
        <div className="app-container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
