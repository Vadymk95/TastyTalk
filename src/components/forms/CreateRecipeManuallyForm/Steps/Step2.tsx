import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <div className="inline-flex gap-2 items-center">
                <FontAwesomeIcon
                    size="xl"
                    className="text-secondary"
                    icon={faQuestionCircle}
                />
                <p>{t('Forms.CreateRecipeManuallyForm.helpText')}</p>
            </div>
        </section>
    );
};
