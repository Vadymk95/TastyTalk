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

export const Step7: FC<StepProps> = ({ formik, maxSteps }) => {
    const { t } = useTranslation();
    const { values, errors } = formik;
    const isLastFieldValid = (): boolean => {
        const warnings = values.warnings || [];

        if (warnings.length === 0) {
            return true;
        }

        const lastWarning = warnings[warnings.length - 1];

        return lastWarning.trim() !== '' && !errors.warnings;
    };

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.7.description')}</h3>

            <FieldArray
                name="warnings"
                render={(arrayHelpers) => (
                    <div>
                        {values.warnings &&
                            values.warnings.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center mb-4"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <Textarea
                                            name={`warnings.${index}`}
                                            placeholder={t(
                                                'Forms.CreateRecipeManuallyForm.warningPlaceholder'
                                            )}
                                            label={`${t(
                                                'Forms.CreateRecipeManuallyForm.warning'
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
                            variant="secondary"
                            size="small"
                            disabled={
                                (!!values.warnings &&
                                    values.warnings.length >= maxSteps) ||
                                !isLastFieldValid()
                            }
                            onClick={() => arrayHelpers.push('')}
                            className="mt-2"
                        >
                            {t('Forms.CreateRecipeManuallyForm.addWarning')}
                        </Button>
                    </div>
                )}
            />
        </section>
    );
};
