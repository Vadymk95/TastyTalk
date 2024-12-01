import { FormikProps } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipePreviewModal } from '@root/components/modals';
import { Button } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';
import { Recipe as RecipeType, StepStatus } from '@root/types';

import {
    faArrowRight,
    faCheckCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepProps {
    formik: FormikProps<RecipeType>;
    skippedSteps: number[];
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

const TOTAL_STEPS_WITHOUT_COMPLETED_STEP = 8;

export const Step9: FC<StepProps> = ({
    formik,
    skippedSteps,
    setCurrentStep
}) => {
    const { openModal } = useModalStore();
    const { t } = useTranslation();
    const { values } = formik;

    const handleOpenModal = () => openModal(ModalsEnum.RecipePreview);

    const steps: StepStatus[] = Array.from(
        { length: TOTAL_STEPS_WITHOUT_COMPLETED_STEP },
        (_, i) => {
            const stepNumber = i;
            const isSkipped = skippedSteps.includes(stepNumber);
            return {
                step: stepNumber + 1,
                status: isSkipped ? 'incompleted' : 'completed'
            };
        }
    );

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.9.description')}</h3>

            <div className="flex flex-col gap-4">
                {steps.map(({ step, status }) => {
                    const isCompleted = status === 'completed';
                    const cardStyles = isCompleted
                        ? {
                              container: 'bg-green-100 border-green-200',
                              icon: 'text-green-500',
                              title: 'text-green-500'
                          }
                        : {
                              container: 'bg-accent-light/20 border-yellow-200',
                              icon: 'text-yellow-500',
                              title: 'text-yellow-500'
                          };

                    return (
                        <div
                            key={step}
                            className={`plate border ${cardStyles.container} flex justify-between items-center sm:items-start sm:flex-col sm:gap-3 p-4`}
                        >
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon
                                    icon={
                                        isCompleted
                                            ? faCheckCircle
                                            : faExclamationCircle
                                    }
                                    className={cardStyles.icon}
                                    size="lg"
                                />
                                <div>
                                    <h4
                                        className={`font-bold ${cardStyles.title}`}
                                    >
                                        {t('Stepper.step')} {step}:{' '}
                                        {t(
                                            `Stepper.Steps.Recipe.${step}.title`
                                        )}
                                    </h4>
                                    <p className="text-sm label">
                                        {t(
                                            `Stepper.${isCompleted ? 'completed' : 'incompleteStep'}`
                                        )}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="small"
                                variant={isCompleted ? 'secondary' : 'accent'}
                                onClick={() => setCurrentStep(step - 1)}
                                className="flex items-center gap-2"
                            >
                                {t(
                                    `Stepper.${isCompleted ? 'checkStep' : 'completeStep'}`
                                )}
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end sm:justify-center">
                <Button variant="neutral" onClick={handleOpenModal}>
                    {t('Forms.CreateRecipeManuallyForm.previewRecipe')}
                </Button>
            </div>

            <RecipePreviewModal recipe={values} />
        </section>
    );
};
