import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    buttonLabel: string;
    isCurrentPlan?: boolean;
}

export const PricingCard: FC<PricingCardProps> = ({
    title,
    price,
    features,
    buttonLabel,
    isCurrentPlan = false
}) => {
    const { t } = useTranslation();

    return (
        <div
            className={`relative bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 ${
                isCurrentPlan
                    ? 'border-2 border-primary shadow-lg scale-105'
                    : 'hover:scale-105 duration-200'
            }`}
        >
            {isCurrentPlan && (
                <span className="absolute top-2 right-2 bg-accent text-neutral-dark/70 text-xs px-2 py-1 rounded">
                    {t('Pricing.yourPlan')}
                </span>
            )}
            <h3 className="text-lg font-semibold text-neutral-dark">{title}</h3>
            <p className="text-4xl font-bold text-primary">{price}</p>
            <ul className="text-sm text-neutral-dark/80 space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <span className="mr-2">✔️</span>
                        {feature}
                    </li>
                ))}
            </ul>
            <Button
                variant={isCurrentPlan ? 'primary' : 'secondary'}
                className="mt-auto"
                disabled={isCurrentPlan}
            >
                {isCurrentPlan ? t('General.selected') : buttonLabel}
            </Button>
        </div>
    );
};
