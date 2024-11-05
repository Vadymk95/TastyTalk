import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const Navigation: FC = () => {
    const location = useLocation();
    const { user, signOutUser } = useAuthStore();
    const { t } = useTranslation();
    const isAuth = !!user;
    const showHomeLink = location.pathname !== routes.home;
    const showAuthLink = location.pathname !== routes.auth;

    console.log(user);

    return (
        <nav className="flex gap-4">
            {isAuth ? (
                <Link
                    onClick={signOutUser}
                    to={routes.auth}
                    className="link-primary"
                >
                    {t('Header.signOut')}
                </Link>
            ) : (
                <>
                    {showAuthLink && (
                        <Link to={routes.auth} className="link-primary">
                            {t('Header.signIn')}
                        </Link>
                    )}
                </>
            )}

            {showHomeLink && (
                <Link to={routes.home} className="link-primary">
                    {t('Header.home')}
                </Link>
            )}
        </nav>
    );
};
