import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PricingCard } from '@root/components/ui';

export const Pricing: FC = () => {
    const { t } = useTranslation();

    const currentPlan = 'Basic';

    const pricingPlans = [
        {
            title: t('Pricing.free.title'),
            price: t('Pricing.free.price'),
            features: [
                t('Pricing.free.feature1'),
                t('Pricing.free.feature2'),
                t('Pricing.free.feature3')
            ],
            buttonLabel: t('Pricing.free.button'),
            isCurrentPlan: false
        },
        {
            title: t('Pricing.basic.title'),
            price: t('Pricing.basic.price'),
            features: [
                t('Pricing.basic.feature1'),
                t('Pricing.basic.feature2'),
                t('Pricing.basic.feature3')
            ],
            buttonLabel: t('Pricing.basic.button'),
            isCurrentPlan: currentPlan === 'Basic'
        },
        {
            title: t('Pricing.standard.title'),
            price: t('Pricing.standard.price'),
            features: [
                t('Pricing.standard.feature1'),
                t('Pricing.standard.feature2'),
                t('Pricing.standard.feature3')
            ],
            buttonLabel: t('Pricing.standard.button'),
            isCurrentPlan: false
        },
        {
            title: t('Pricing.premium.title'),
            price: t('Pricing.premium.price'),
            features: [
                t('Pricing.premium.feature1'),
                t('Pricing.premium.feature2'),
                t('Pricing.premium.feature3')
            ],
            buttonLabel: t('Pricing.premium.button'),
            isCurrentPlan: false
        }
    ];

    return (
        <div className="grid sm:!grid-cols-1 grid-cols-4 xl:grid-cols-2 gap-6 items-stretch grid-auto-rows-fr">
            {pricingPlans.map((plan, index) => (
                <PricingCard
                    key={index}
                    title={plan.title}
                    price={plan.price}
                    features={plan.features as string[]}
                    buttonLabel={plan.buttonLabel}
                    isCurrentPlan={plan.isCurrentPlan}
                />
            ))}
        </div>
    );
};
