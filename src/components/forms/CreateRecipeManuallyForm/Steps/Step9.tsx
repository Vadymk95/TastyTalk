import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step9: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.9.description')}</h3>
        </section>
    );
};
