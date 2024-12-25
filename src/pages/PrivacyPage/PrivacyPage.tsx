import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Privacy } from '@root/components/common/Privacy';

const PrivacyPage: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="main-heading">{t('PrivacyPage.title')}</h1>

            <div className="plate">
                <Privacy />
            </div>
        </>
    );
};

export default PrivacyPage;
