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

export const Step4: FC<StepProps> = ({ formik }) => {
    const { t } = useTranslation();
    const { values } = formik;

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.4.description')}</h3>

            <FieldArray
                name="ingridients"
                render={(arrayHelpers) => (
                    <div>
                        {values.ingredients &&
                            values.ingredients.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center gap-4 mb-4"
                                >
                                    <div className="flex items-end flex-1">
                                        <Input
                                            type="text"
                                            name={`socialLinks.${index}.url`}
                                            placeholder={t(
                                                'Forms.EditProfileForm.linkPlaceholder'
                                            )}
                                            label={t(
                                                'Forms.EditProfileForm.link'
                                            )}
                                            isRequired
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
                                                icon={faXmark}
                                                size="xl"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        <Button
                            type="button"
                            size="small"
                            disabled={
                                !!values.ingredients &&
                                values.ingredients.length >= 30
                            }
                            onClick={() => arrayHelpers.push('')}
                            className="mt-2"
                        >
                            {t('Forms.EditProfileForm.addLink')}
                        </Button>
                    </div>
                )}
            />
        </section>
    );
};
