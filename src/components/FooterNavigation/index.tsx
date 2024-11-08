import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const FooterNavigation: FC = () => {
    const { t } = useTranslation();
    const { isRegistered, signOutUser } = useAuthStore();

    return (
        <nav className="flex justify-end">
            {isRegistered ? (
                //temporarily solution
                <Link
                    onClick={signOutUser}
                    to={routes.auth}
                    className="link-primary nav-link p-4"
                >
                    {t('Header.signOut')}
                </Link>
            ) : (
                <Link
                    onClick={signOutUser}
                    to={routes.auth}
                    className="link-primary nav-link p-4"
                >
                    {t('Header.signOut')}
                </Link>
            )}
        </nav>
    );
};
