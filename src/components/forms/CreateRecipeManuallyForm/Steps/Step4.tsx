import { FieldArray, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@root/components/ui';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
    maxSteps: number;
}

export const Step4: FC<StepProps> = ({ formik, maxSteps }) => {
    const { t } = useTranslation();
    const { values, errors, touched } = formik;
    const isLastFieldValid = (): boolean => {
        const ingredients = values.ingredients || [];

        if (ingredients.length === 0) {
            return true;
        }

        const lastIngredient = ingredients[ingredients.length - 1] || '';

        return (
            lastIngredient.trim() !== '' &&
            !(errors.ingredients && touched.ingredients)
        );
    };

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.4.description')}</h3>

            <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                    <div>
                        {values.ingredients &&
                            values.ingredients.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center mb-4"
                                >
                                    <div className="flex items-end">
                                        <Input
                                            name={`ingredients.${index}`}
                                            placeholder={t(
                                                'Forms.CreateRecipeManuallyForm.ingredientPlaceholder'
                                            )}
                                            label={`${t(
                                                'Forms.CreateRecipeManuallyForm.ingredient'
                                            )} ${index + 1}`}
                                            isRequired
                                            className="flex-1 mr-2"
                                            size="small"
                                        />
                                        <Button
                                            className="flex-all-center"
                                            size="small"
                                            variant="close"
                                            onClick={() =>
                                                arrayHelpers.remove(index)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                className="text-primary"
                                                icon={faXmark}
                                                size="xl"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        <Button
                            variant="secondary"
                            size="small"
                            disabled={
                                (!!values.ingredients &&
                                    values.ingredients.length >= maxSteps) ||
                                !isLastFieldValid()
                            }
                            onClick={() => arrayHelpers.push('')}
                            className="mt-2"
                        >
                            {t('Forms.CreateRecipeManuallyForm.addIngredient')}
                        </Button>
                    </div>
                )}
            />
        </section>
    );
};
