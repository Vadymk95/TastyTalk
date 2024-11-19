import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GreetingCard } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

import {
    faFilePen,
    faFileSignature,
    faNewspaper,
    faScroll
} from '@fortawesome/free-solid-svg-icons';

const GreetingPage: FC = () => {
    const { t } = useTranslation();
    const { isEmailVerified } = useAuthStore();

    return (
        <div className="plate flex-all-center flex-col sm:w-full">
            <h1 className="main-heading-70">{t('GreetingPage.welcome')}</h1>

            <p className="text-lg text-center mb-8 max-w-md">
                {t('GreetingPage.description')}
            </p>

            <div
                className={`grid gap-4 w-full max-w-2xl sm:max-w-xl grid-cols-2 sm:grid-cols-1`}
            >
                <GreetingCard
                    to={routes.recipes}
                    title={t('GreetingPage.recipes')}
                    icon={faScroll}
                />
                <GreetingCard
                    to={routes.mealsPlan}
                    title={t('GreetingPage.mealPlans')}
                    icon={faNewspaper}
                />
                <GreetingCard
                    to={routes.recipesCreate}
                    title={t('GreetingPage.createRecipe')}
                    icon={faFilePen}
                    disabled={!isEmailVerified}
                />
                <GreetingCard
                    to={routes.mealsPlanCreate}
                    title={t('GreetingPage.createPlan')}
                    icon={faFileSignature}
                    disabled={!isEmailVerified}
                />
            </div>
        </div>
    );
};

export default GreetingPage;
