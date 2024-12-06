import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import {
    faNewspaper,
    faPlus,
    faRightFromBracket,
    faScroll,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <nav
            className={`flex ${isRegistered ? 'justify-between' : 'justify-end'}`}
        >
            {isRegistered ? (
                <>
                    <div></div>
                    <div>
                        <Link
                            to={routes.recipesCreate}
                            className="link-primary nav-link p-4 bg-primary sm:px-6"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon
                                className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                                icon={faScroll}
                            />
                            <span className="sm:hidden">
                                {t('Footer.createRecipe')}
                            </span>
                        </Link>
                        <Link
                            to={routes.mealsPlanCreate}
                            className="link-primary nav-link p-4 bg-secondary sm:px-6"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon
                                className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                                icon={faNewspaper}
                            />
                            <span className="sm:hidden">
                                {t('Footer.createMealPlan')}
                            </span>
                        </Link>
                    </div>
                    <Link
                        to={routes.profile}
                        className="link-primary nav-link p-4 sm:px-6"
                    >
                        <FontAwesomeIcon
                            className="mr-3 sm:mr-0 sm:text-2xl"
                            icon={faUser}
                        />
                        <span className="sm:hidden">{t('Footer.profile')}</span>
                    </Link>
                </>
            ) : (
                <Link
                    onClick={handleSignOut}
                    to={routes.auth}
                    className="link-primary nav-link p-4"
                >
                    <FontAwesomeIcon
                        className="mr-3"
                        icon={faRightFromBracket}
                    />
                    <span>{t('Footer.signOut')}</span>
                </Link>
            )}
        </nav>
    );
};
