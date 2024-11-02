import { Footer, Header, Main } from '@root/components';
import { FC } from 'react';

export const App: FC = () => {
    return (
        <div className="app-container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
