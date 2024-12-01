import { FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
    faArrowRight,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecipePreviewModal } from '@root/components/modals';
import { Button } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';
import { Recipe as RecipeType } from '@root/types';

interface StepProps {
    formik: FormikProps<RecipeType>;
    skippedSteps: number[];
}

export const Step9: FC<StepProps> = ({ formik, skippedSteps }) => {
    const { openModal } = useModalStore();
    const { t } = useTranslation();
    const { values } = formik;

    const handleOpenModal = () => openModal(ModalsEnum.RecipePreview);

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.9.description')}</h3>

            <div className="flex flex-col gap-4">
                {skippedSteps.length > 0 ? (
                    skippedSteps.map((step) => {
                        const currentStep = step + 1;

                        return (
                            <div
                                key={currentStep}
                                className="plate bg-accent-light/20 border border-yellow-200 flex justify-between items-center p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon
                                        icon={faExclamationCircle}
                                        className="text-accent-dark"
                                        size="lg"
                                    />
                                    <div>
                                        <h4 className="font-bold text-accent-dark">
                                            {t('Stepper.step')} {currentStep}:{' '}
                                            {t(
                                                `Stepper.Steps.Recipe.${currentStep}.title`
                                            )}
                                        </h4>
                                        <p className="text-sm label">
                                            {t('Stepper.incompleteStep')}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size="small"
                                    variant="secondary"
                                    onClick={() => {}}
                                    className="flex items-center gap-2"
                                >
                                    {t('Stepper.completeStep')}
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-green-600 font-bold">
                        {t('Stepper.Steps.Recipe.9.allStepsCompleted')}
                    </p>
                )}
            </div>

            <Button
                size="large"
                variant="primary"
                onClick={handleOpenModal}
                className="mt-6"
            >
                {t('Forms.CreateRecipeManuallyForm.previewRecipe')}
            </Button>

            <RecipePreviewModal recipe={values} />
        </section>
    );
};
