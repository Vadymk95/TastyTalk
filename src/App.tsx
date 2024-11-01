import { Footer, Header, Main } from '@root/components';
import { FC, Suspense } from 'react';
import './App.css';

export const App: FC = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Main />
            </Suspense>
            <Footer />
        </>
    );
};
