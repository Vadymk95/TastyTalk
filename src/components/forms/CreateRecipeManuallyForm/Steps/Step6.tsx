import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Step6: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.6.description')}</h3>
        </section>
    );
};
