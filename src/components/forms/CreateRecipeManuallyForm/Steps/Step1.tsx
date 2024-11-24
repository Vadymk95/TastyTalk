import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step1: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.1.description')}</div>;
};
