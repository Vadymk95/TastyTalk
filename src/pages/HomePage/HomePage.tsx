import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MainFilterBlock } from '@root/components/common';

export const HomePage: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            <MainFilterBlock />
            {t('')}
        </div>
    );
};
