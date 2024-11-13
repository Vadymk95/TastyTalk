import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GreetingCard } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

const GreetingPage: FC = () => {
    const { t } = useTranslation();
    const { isEmailVerified } = useAuthStore();

    //bg-gradient-main
    return (
        <div className="plate flex-all-center flex-col sm:w-full">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
                {t('GreetingPage.welcome')}
            </h1>

            <p className="text-lg text-center mb-8 max-w-md">
                {t('GreetingPage.description')}
            </p>

            <div
                className={`grid gap-4 w-full max-w-lg grid-cols-2 sm:grid-cols-1`}
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
