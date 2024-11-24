import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step4: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.4.description')}</div>;
};
