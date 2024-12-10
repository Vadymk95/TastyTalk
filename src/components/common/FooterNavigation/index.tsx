import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import {
    faFilePen,
    faFileSignature,
    faPlus,
    faRightFromBracket,
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
        <nav className="flex items-center justify-between w-full">
            {isRegistered ? (
                <>
                    <div className=""></div>

                    <div className="flex flex-grow">
                        <Link
                            to={routes.recipesCreate}
                            className="link-primary nav-link p-4 bg-primary sm:px-6 flex-grow flex-all-center"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon
                                className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                                icon={faFilePen}
                            />
                            <span className="sm:hidden">
                                {t('Footer.createRecipe')}
                            </span>
                        </Link>
                        <Link
                            to={routes.mealsPlanCreate}
                            className="nav-link p-4 bg-secondary hover:bg-secondary-light sm:px-6 flex-grow flex-all-center focus:bg-secondary-dark/50"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon
                                className="mr-3 sm:mr-0 ml-1 sm:text-2xl"
                                icon={faFileSignature}
                            />
                            <span className="sm:hidden">
                                {t('Footer.createMealPlan')}
                            </span>
                        </Link>
                    </div>
                    <div className="flex sm:flex-grow">
                        <Link
                            to={routes.profile}
                            className="link-primary nav-link p-4 sm:flex-grow flex-all-center"
                        >
                            <FontAwesomeIcon
                                className="mr-3 sm:mr-0 sm:text-2xl"
                                icon={faUser}
                            />
                            <span className="sm:hidden">
                                {t('Footer.profile')}
                            </span>
                        </Link>
                    </div>
                </>
            ) : (
                <Link
                    onClick={handleSignOut}
                    to={routes.auth}
                    className="link-primary nav-link p-4"
                >
                    <FontAwesomeIcon
                        className="mr-3 sm:mr-0 sm:text-2xl"
                        icon={faRightFromBracket}
                    />
                    <span className="sm:hidden">{t('Footer.signOut')}</span>
                </Link>
            )}
        </nav>
    );
};
