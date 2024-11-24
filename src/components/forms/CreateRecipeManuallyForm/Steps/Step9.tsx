import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step9: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.9.description')}</div>;
};
