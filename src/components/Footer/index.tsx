import { FC } from 'react';

import { useAuthStore } from '@root/store/authStore';

import { PrivateFooter, PublicFooter } from './components';

export const Footer: FC = () => {
    const { user } = useAuthStore();

    const isAuth = !!user;

    return (
        <footer className="footer">
            <div className="container text-center">
                {isAuth ? <PrivateFooter /> : <PublicFooter />}
            </div>
        </footer>
    );
};
