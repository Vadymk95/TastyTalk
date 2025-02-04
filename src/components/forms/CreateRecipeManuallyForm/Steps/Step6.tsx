import { FieldArray, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Textarea } from '@root/components/ui';
import { Recipe as RecipeType } from '@root/types';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepProps {
    formik: FormikProps<RecipeType>;
    maxSteps: number;
}

export const Step6: FC<StepProps> = ({ formik, maxSteps }) => {
    const { t } = useTranslation();
    const { values, errors } = formik;
    const isLastFieldValid = (): boolean => {
        const tips = values.tips || [];

        if (tips.length === 0) {
            return true;
        }

        const lastTip = tips[tips.length - 1];

        return lastTip.trim() !== '' && !errors.tips;
    };

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.6.description')}</h3>

            <FieldArray
                name="tips"
                render={(arrayHelpers) => (
                    <div>
                        {values.tips &&
                            values.tips.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <Textarea
                                            name={`tips.${index}`}
                                            placeholder={t(
                                                'Forms.CreateRecipeManuallyForm.tipPlaceholder'
                                            )}
                                            label={`${t(
                                                'Forms.CreateRecipeManuallyForm.tip'
                                            )} ${index + 1}`}
                                            maxLength={200}
                                            className="flex-1"
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
                            type="button"
                            variant="secondary"
                            size="small"
                            disabled={
                                (!!values.tips &&
                                    values.tips.length >= maxSteps) ||
                                !isLastFieldValid()
                            }
                            onClick={() => arrayHelpers.push('')}
                            className="mt-2"
                        >
                            {t('Forms.CreateRecipeManuallyForm.addTip')}
                        </Button>
                    </div>
                )}
            />
        </section>
    );
};
