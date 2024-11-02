import { routes } from '@root/router/routes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Navigation: FC = () => {
    const { t } = useTranslation();
    const isAuth = false;

    return (
        <nav className="flex gap-4">
            {isAuth ? (
                <Link to={routes.home} className="link">
                    {t('signOut')}
                </Link>
            ) : (
                <Link to={routes.auth} className="link">
                    {t('signIn')}
                </Link>
            )}
        </nav>
    );
};
