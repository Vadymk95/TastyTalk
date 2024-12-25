import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@root/components/ui/Input';

export const Step8: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.8.description')}</h3>

            <Input
                name="videoUrl"
                type="url"
                placeholder={t(
                    'Forms.CreateRecipeManuallyForm.videoUrlPlaceholder'
                )}
                isRequired
                label={t('Forms.CreateRecipeManuallyForm.videoUrl')}
            />

            <p>{t('Forms.CreateRecipeManuallyForm.videoUrlPhotoHelpText')}</p>
        </section>
    );
};
