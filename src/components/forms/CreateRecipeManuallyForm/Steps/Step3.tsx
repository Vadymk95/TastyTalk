import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step3: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.3.description')}</div>;
};
