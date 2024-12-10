import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import { faNewspaper, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PrivateNavigation: FC = () => {
    const { t } = useTranslation();
    const { isRegistered } = useAuthStore();

    return (
        <>
            {!isRegistered ? (
                <Link to={routes.auth} className="link-primary nav-link px-4">
                    <span>{t('Header.registerFinish')}</span>
                </Link>
            ) : (
                <>
                    <Link
                        to={routes.recipes}
                        className="nav-link px-4 bg-secondary hover:bg-secondary-light sm:px-6 flex-grow flex-all-center"
                    >
                        <FontAwesomeIcon
                            icon={faScroll}
                            className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                        />
                        <span className="sm:hidden">
                            {t('Header.allRecipes')}
                        </span>
                    </Link>
                    <Link
                        to={routes.mealsPlan}
                        className="link-primary nav-link text-center px-4 sm:px-6"
                    >
                        <FontAwesomeIcon
                            icon={faNewspaper}
                            className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                        />
                        <span className="sm:hidden">
                            {t('Header.allMealPlans')}
                        </span>
                    </Link>
                </>
            )}
        </>
    );
};
