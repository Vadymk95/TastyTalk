import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Pricing } from '@root/components/common';

const PricingPage: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="main-heading">{t('PricingPage.title')}</h1>
            <p className="text-neutral-light">{t('PricingPage.description')}</p>

            <div className="flex-all-center mt-8">
                <Pricing isPreviewMode />
            </div>
        </div>
    );
};

export default PricingPage;
