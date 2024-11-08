import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const PrivateNavigation: FC = () => {
    const { t } = useTranslation();
    const { isRegistered, deleteUserAccount } = useAuthStore();

    return (
        <>
            {!isRegistered && (
                <Link to={routes.auth} className="link-primary nav-link p-4">
                    {t('Header.registerFinish')}
                </Link>
            )}

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
