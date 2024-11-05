import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const Navigation: FC = () => {
    const location = useLocation();
    const { user, signOutUser, deleteUserAccount } = useAuthStore();
    const { t } = useTranslation();
    const isAuth = !!user;
    const showHomeLink = location.pathname !== routes.home;
    const showAuthLink = location.pathname !== routes.auth;

    return (
        <nav className="flex">
            {isAuth ? (
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
                            deleteUserAccount(
                                'jo_buyer@mailinator.com',
                                'Passw0rd'
                            )
                        }
                        to={routes.home}
                        className="link-primary nav-link p-4"
                    >
                        {t('PersonalInfoPage.deleteAccount')}
                    </Link>
                </>
            ) : (
                <>
                    {showAuthLink && (
                        <Link
                            to={routes.auth}
                            className="link-primary nav-link p-4"
                        >
                            {t('Header.signIn')}
                        </Link>
                    )}
                </>
            )}

            {showHomeLink && (
                <Link to={routes.home} className="link-primary nav-link p-4">
                    {t('Header.home')}
                </Link>
            )}
        </nav>
    );
};
