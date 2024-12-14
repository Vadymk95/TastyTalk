import { FC } from 'react';

import { Button } from '@root/components/ui';

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    buttonLabel: string;
}

export const PricingCard: FC<PricingCardProps> = ({
    title,
    price,
    features,
    buttonLabel
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
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
            <Button variant="secondary" className="mt-auto">
                {buttonLabel}
            </Button>
        </div>
    );
};
