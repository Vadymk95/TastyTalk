import { FieldArray, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Textarea } from '@root/components/ui';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
    maxSteps: number;
}

export const Step5: FC<StepProps> = ({ formik, maxSteps }) => {
    const { t } = useTranslation();
    const { values } = formik;

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.5.description')}</h3>

            <FieldArray
                name="steps"
                render={(arrayHelpers) => (
                    <div>
                        {values.steps &&
                            values.steps.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <Textarea
                                            name={`steps.${index}`}
                                            placeholder={t(
                                                'Forms.CreateRecipeManuallyForm.stepPlaceholder'
                                            )}
                                            label={`${t(
                                                'Forms.CreateRecipeManuallyForm.step'
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
                                !!values.steps &&
                                values.steps.length >= maxSteps
                            }
                            onClick={() => arrayHelpers.push('')}
                            className="mt-2"
                        >
                            {t('Forms.CreateRecipeManuallyForm.addStep')}
                        </Button>
                    </div>
                )}
            />
        </section>
    );
};
