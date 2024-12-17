import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import {
    faNewspaper,
    faScroll,
    faSearch,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PrivateNavigation: FC = () => {
    const { t } = useTranslation();
    const { isRegistered, isEmailVerified, hasPaidPlan } = useAuthStore();
    const hasPlan = hasPaidPlan();

    return (
        <>
            {!isRegistered ? (
                <Link to={routes.auth} className="link-primary nav-link px-4">
                    <span>{t('Header.registerFinish')}</span>
                </Link>
            ) : (
                <>
                    {isEmailVerified && (
                        <>
                            <Link
                                to={routes.recipes}
                                className="link-primary nav-link px-4 sm:px-6 flex-grow flex-all-center focus:bg-primary-dark"
                            >
                                <FontAwesomeIcon
                                    icon={faScroll}
                                    className="mr-3 sm:mr-0 sm:text-2xl"
                                />
                                <span className="sm:hidden">
                                    {t('Header.allRecipes')}
                                </span>
                            </Link>

                            {hasPlan && (
                                <Link
                                    to={routes.mealsPlan}
                                    className="link-primary nav-link text-center px-4 sm:px-6 focus:bg-primary-dark"
                                >
                                    <FontAwesomeIcon
                                        icon={faNewspaper}
                                        className="mr-3 sm:mr-0 sm:text-2xl"
                                    />
                                    <span className="sm:hidden">
                                        {t('Header.allMealPlans')}
                                    </span>
                                </Link>
                            )}

                            <Link
                                to={routes.searchProfiles}
                                className="link-primary nav-link text-center px-4 sm:px-6 focus:bg-primary-dark"
                            >
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="mr-3 sm:hidden"
                                />
                                <FontAwesomeIcon
                                    icon={faUsers}
                                    className="hidden sm:block mr-3 sm:mr-0 sm:text-2xl"
                                />
                                <span className="sm:hidden">
                                    {t('Header.searchProfiles')}
                                </span>
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    );
};
