import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step8: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.8.description')}</div>;
};
