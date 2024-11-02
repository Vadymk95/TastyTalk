import { AppRouter } from '@root/router/AppRouter';
import { FC } from 'react';

export const Main: FC = () => {
    return (
        <main className="main-content">
            <AppRouter />
        </main>
    );
};
