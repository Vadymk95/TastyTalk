import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step5: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.5.description')}</div>;
};
