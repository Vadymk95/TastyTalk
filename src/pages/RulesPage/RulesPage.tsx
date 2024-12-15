import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Rules } from '@root/components/common';

const RulesPage: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="main-heading">{t('RulesPage.title')}</h1>

            <div className="plate">
                <Rules />
            </div>
        </>
    );
};

export default RulesPage;
