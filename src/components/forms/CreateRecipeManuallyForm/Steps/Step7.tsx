import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step7: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.7.description')}</div>;
};
