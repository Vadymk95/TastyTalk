import { Field, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormikMultiSelect, FormikSelect, Input } from '@root/components/ui';
import { useCategories } from '@root/hooks';
import {
    Difficulty,
    EDifficulty,
    Option,
    Recipe as RecipeType
} from '@root/types';

interface StepProps {
    formik: FormikProps<RecipeType>;
}

export const Step1: FC<StepProps> = ({ formik }) => {
    const categories = useCategories();
    const { t } = useTranslation();

    const selectBgColor = (type: Difficulty | null) => {
        if (type === EDifficulty.EASY) return 'secondary';
        if (type === EDifficulty.MEDIUM) return 'accent';
        if (type === EDifficulty.HARD) return 'primary';

        return 'neutral';
    };

    const options: Option[] = [
        { value: EDifficulty.EASY, label: t('General.easy') },
        { value: EDifficulty.MEDIUM, label: t('General.medium') },
        { value: EDifficulty.HARD, label: t('General.hard') }
    ];

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.1.description')}</h3>

            <div className="flex flex-col gap-6 w-full max-w-md">
                <Input
                    name="title"
                    label={t('Forms.CreateRecipeManuallyForm.title')}
                    placeholder={t('Forms.CreateRecipeManuallyForm.title')}
                />

                <label className="label" htmlFor="difficulty">
                    <p>{t('Forms.CreateRecipeManuallyForm.difficulty')}</p>
                    <FormikSelect
                        variant={selectBgColor(formik.values.difficulty)}
                        name="difficulty"
                        options={options}
                        placeholder={t(
                            'Forms.CreateRecipeManuallyForm.difficultyPlaceholder'
                        )}
                    />
                </label>

                <Field
                    name="categories"
                    component={FormikMultiSelect}
                    categories={categories}
                    maxBadges={5}
                />

                <Input
                    name="cookingTime"
                    type="number"
                    label={t('Forms.CreateRecipeManuallyForm.cookingTime')}
                />
            </div>
        </section>
    );
};
