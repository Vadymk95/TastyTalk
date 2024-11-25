import { FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormikSelect, Input } from '@root/components/ui';
import { Difficulty } from '@root/types';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
}

export const Step1: FC<StepProps> = ({ formik }) => {
    const { t } = useTranslation();

    const selectBgColor = (type: Difficulty | null) => {
        if (type === t('General.easy'))
            return 'bg-secondary hover:bg-secondary-light';
        if (type === t('General.medium'))
            return 'bg-accent hover:bg-accent-light';
        if (type === t('General.hard'))
            return 'bg-primary hover:bg-primary-light';

        return 'bg-neutral-light hover:bg-neutral';
    };

    const options = [
        { value: 'easy', label: t('General.easy') },
        { value: 'medium', label: t('General.medium') },
        { value: 'hard', label: t('General.hard') }
    ];

    const localizedOptions = options.map((opt) => opt.label);

    return (
        <section>
            <h3 className="mb-6">{t('Stepper.Steps.Recipe.1.description')}</h3>

            <div className="flex flex-col gap-6 w-full max-w-md">
                <Input
                    name="title"
                    label={t('Forms.CreateRecipeManuallyForm.title')}
                    placeholder={t('Forms.CreateRecipeManuallyForm.title')}
                />

                <label className="label" htmlFor="difficulty">
                    <p>{t('Forms.CreateRecipeManuallyForm.difficulty')}</p>
                    <FormikSelect
                        className={selectBgColor(formik.values.difficulty)}
                        name="difficulty"
                        options={localizedOptions}
                        onBlur={formik.handleBlur}
                        placeholder={t(
                            'Forms.CreateRecipeManuallyForm.difficultyPlaceholder'
                        )}
                    />
                </label>

                <label className="label" htmlFor="categories">
                    <p>{t('Forms.CreateRecipeManuallyForm.categories')}</p>
                    <FormikSelect
                        name="categories"
                        options={['as']}
                        placeholder={t(
                            'Forms.CreateRecipeManuallyForm.categoriesPlaceholder'
                        )}
                        resetable={true}
                    />
                </label>

                <Input
                    name="cookingTime"
                    type="number"
                    label={t('Forms.CreateRecipeManuallyForm.cookingTime')}
                />
            </div>
        </section>
    );
};
