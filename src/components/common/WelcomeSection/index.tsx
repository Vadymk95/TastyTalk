import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Image } from '@root/components/ui/Image';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

import logo from '@root/assets/images/logo.svg';

export const WelcomeSection: FC = () => {
    const { t } = useTranslation();
    const { user, initialized } = useAuthStore();
    const isAuth = !!user;

    return (
        <section className="flex flex-col items-center justify-center h-[calc(100vh-112px)] py-8">
            <Image src={logo} className="w-1/2 mb-4" alt="TastyTalks" />

            <h1 className="main-heading text-7xl md:text-4xl">
                {t('WelcomeSection.title')}
            </h1>
            <p className="text-3xl md:text-lg text-center text-neutral">
                {t('WelcomeSection.description')}
            </p>

            {initialized && isAuth && (
                <>
                    <h2 className="text-3xl md:text-lg text-center text-neutral mt-10">
                        {t('WelcomeSection.cta')}
                    </h2>

                    <Link
                        to={routes.recipesCreate}
                        className="link-primary text-2xl nav-link rounded-lg px-6 py-4 bg-primary flex-all-center my-8"
                    >
                        <span>{t('WelcomeSection.createRecipe')}</span>
                    </Link>
                </>
            )}
        </section>
    );
};
