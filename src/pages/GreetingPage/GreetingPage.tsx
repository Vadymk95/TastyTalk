import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GreetingCard } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

const GreetingPage: FC = () => {
    const { t } = useTranslation();
    const { isEmailVerified } = useAuthStore();

    //bg-gradient-main
    return (
        <div className="flex flex-col items-center justify-center w-4/5 bg-gradient-main p-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-center">
                {t('GreetingPage.welcome')}
            </h1>

            <p className="text-lg text-neutral-light text-center mb-8 max-w-md">
                {t('GreetingPage.description')}
            </p>

            <div
                className={`grid gap-4 w-full max-w-lg ${isEmailVerified ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
                {isEmailVerified ? (
                    <>
                        <GreetingCard
                            to={routes.recipes}
                            title={t('GreetingPage.recipes')}
                        />
                        <GreetingCard
                            to={routes.mealsPlan}
                            title={t('GreetingPage.mealPlans')}
                        />
                        <GreetingCard
                            to={routes.recipesCreate}
                            title={t('GreetingPage.createRecipe')}
                        />
                        <GreetingCard
                            to={routes.mealsPlanCreate}
                            title={t('GreetingPage.createPlan')}
                        />
                    </>
                ) : (
                    <>
                        <GreetingCard
                            to={routes.recipes}
                            title={t('GreetingPage.recipes')}
                        />
                        <GreetingCard
                            to={routes.mealsPlan}
                            title={t('GreetingPage.mealPlans')}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default GreetingPage;
