import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { PrivateNavigation, PublicNavigation } from './components';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderNavigation: FC = () => {
    const { user, isEmailVerified } = useAuthStore();
    const { t } = useTranslation();
    const isAuth = !!user;

    return (
        <nav className="flex">
            {isAuth ? <PrivateNavigation /> : <PublicNavigation />}

            {!isEmailVerified && (
                <Link
                    to={routes.home}
                    className="link-primary nav-link p-4 sm:px-6"
                >
                    <FontAwesomeIcon
                        className="mr-3 sm:mr-0 sm:text-2xl"
                        icon={faHouse}
                    />
                    <span className="sm:hidden">{t('Header.home')}</span>
                </Link>
            )}
        </nav>
    );
};
