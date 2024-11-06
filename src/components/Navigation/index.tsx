import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { PrivateNavigation, PublicNavigation } from './components';

export const Navigation: FC = () => {
    const location = useLocation();
    const { user } = useAuthStore();
    const { t } = useTranslation();
    const isAuth = !!user;
    const showHomeLink = location.pathname !== routes.home;

    return (
        <nav className="flex">
            {isAuth ? <PrivateNavigation /> : <PublicNavigation />}

            {showHomeLink && (
                <Link to={routes.home} className="link-primary nav-link p-4">
                    {t('Header.home')}
                </Link>
            )}
        </nav>
    );
};
