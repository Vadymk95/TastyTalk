import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@root/store/authStore';
import { routes } from '@root/router/routes';

export const PrivateNavigation: FC = () => {
    const { t } = useTranslation();
    const { signOutUser, deleteUserAccount } = useAuthStore();

    return (
        <>
            <Link
                onClick={signOutUser}
                to={routes.auth}
                className="link-primary nav-link p-4"
            >
                {t('Header.signOut')}
            </Link>

            {/* temporary button */}
            <Link
                onClick={() =>
                    deleteUserAccount('jo_buyer@mailinator.com', 'Passw0rd')
                }
                to={routes.home}
                className="link-primary nav-link p-4"
            >
                {t('PersonalInfoPage.deleteAccount')}
            </Link>
        </>
    );
};
