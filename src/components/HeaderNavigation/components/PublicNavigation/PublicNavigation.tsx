import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';

export const PublicNavigation: FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const showAuthLink = location.pathname !== routes.auth;

    return (
        <>
            {showAuthLink && (
                <Link to={routes.auth} className="link-primary nav-link p-4">
                    {t('Header.signIn')}
                </Link>
            )}
        </>
    );
};
