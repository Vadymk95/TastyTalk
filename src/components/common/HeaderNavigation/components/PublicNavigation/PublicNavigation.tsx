import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '@root/router/routes';

import { faRightToBracket, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PublicNavigation: FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const showAuthLink = location.pathname !== routes.auth;

    return (
        <>
            {showAuthLink && (
                <Link to={routes.auth} className="link-primary nav-link p-4">
                    <FontAwesomeIcon
                        className="mr-3 sm:mr-0 sm:text-2xl"
                        icon={faRightToBracket}
                    />
                    <span className="sm:hidden">{t('Header.signIn')}</span>
                </Link>
            )}

            <Link to={routes.pricing} className="link-primary nav-link p-4">
                <FontAwesomeIcon
                    className="mr-3 sm:mr-0 sm:text-2xl"
                    icon={faTags}
                />
                <span className="sm:hidden">{t('Header.pricing')}</span>
            </Link>
        </>
    );
};
