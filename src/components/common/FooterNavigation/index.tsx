import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const FooterNavigation: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isRegistered, signOutUser } = useAuthStore();

    const handleSignOut = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        await signOutUser();
        navigate(routes.auth);
    };

    return (
        <nav className="flex justify-end">
            {isRegistered ? (
                <Link to={routes.profile} className="link-primary nav-link p-4">
                    {t('Footer.profile')}
                </Link>
            ) : (
                <Link
                    onClick={handleSignOut}
                    to={routes.auth}
                    className="link-primary nav-link p-4"
                >
                    {t('Footer.signOut')}
                </Link>
            )}
        </nav>
    );
};
