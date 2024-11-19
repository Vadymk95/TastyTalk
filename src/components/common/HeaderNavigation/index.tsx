import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { PrivateNavigation, PublicNavigation } from './components';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderNavigation: FC = () => {
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
                    <FontAwesomeIcon className="mr-3" icon={faHouse} />
                    <span>{t('Header.home')}</span>
                </Link>
            )}
        </nav>
    );
};
