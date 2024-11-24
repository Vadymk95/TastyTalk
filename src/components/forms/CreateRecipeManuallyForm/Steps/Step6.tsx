import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step6: FC = () => {
    const { t } = useTranslation();

    return <div>{t('Stepper.Steps.Recipe.6.description')}</div>;
};
