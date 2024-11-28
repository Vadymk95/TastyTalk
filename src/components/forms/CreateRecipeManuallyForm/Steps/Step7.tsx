import { FieldArray, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@root/components/ui';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
}

export const Step7: FC<StepProps> = ({ formik }) => {
    const { t } = useTranslation();
    const { values } = formik;

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
                                    <div className="flex items-end">
                                        <Input
                                            type="text"
                                            name={`warnings.${index}`}
                                            placeholder={t(
                                                'Forms.CreateRecipeManuallyForm.warningPlaceholder'
                                            )}
                                            label={`${t(
                                                'Forms.CreateRecipeManuallyForm.warning'
                                            )} ${index + 1}`}
                                            className="flex-1 mr-2"
                                            size="small"
                                        />
                                        <Button
                                            type="button"
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
                                !!values.warnings &&
                                values.warnings.length >= 10
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
