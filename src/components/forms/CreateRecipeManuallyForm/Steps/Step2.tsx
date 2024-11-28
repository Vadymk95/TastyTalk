import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Textarea } from '@root/components/ui';

export const Step2: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.2.description')}</h3>
            <Textarea
                maxLength={500}
                name="description"
                label={t('Forms.CreateRecipeManuallyForm.description')}
                placeholder={t(
                    'Forms.CreateRecipeManuallyForm.descriptionPlaceholder'
                )}
            />

            <p>{t('Forms.CreateRecipeManuallyForm.descriptionHelpText')}</p>
        </section>
    );
};
