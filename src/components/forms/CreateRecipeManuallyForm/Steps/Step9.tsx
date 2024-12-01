import { FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
            <ul>
                {skippedSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>

            <Button onClick={handleOpenModal}>
                {t('Forms.CreateRecipeManuallyForm.previewRecipe')}
            </Button>

            <RecipePreviewModal recipe={values} />
        </section>
    );
};
