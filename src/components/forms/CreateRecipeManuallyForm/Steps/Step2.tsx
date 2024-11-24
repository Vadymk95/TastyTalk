import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step2: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.2.description')}</div>;
};
