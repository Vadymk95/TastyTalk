import { routes } from '@root/router/routes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const isAuth = false;
    const showHomeLink = location.pathname !== routes.home;
    const showAuthLink = location.pathname !== routes.auth;

    return (
        <nav className="flex gap-4">
            {isAuth ? (
                <Link to={routes.home} className="link-primary">
                    {t('signOut')}
                </Link>
            ) : (
                <>
                    {showAuthLink && (
                        <Link to={routes.auth} className="link-primary">
                            {t('signIn')}
                        </Link>
                    )}
                </>
            )}

            {showHomeLink && (
                <Link to={routes.home} className="link-primary">
                    {t('home')}
                </Link>
            )}
        </nav>
    );
};
