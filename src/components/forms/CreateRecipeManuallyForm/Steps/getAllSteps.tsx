import { FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Recipe as RecipeType } from '@root/types';

import {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9
} from '.';
import { StepFieldMapping } from '..';

export const GetAllSteps = (
    formik: FormikProps<RecipeType>,
    stepFieldMapping: StepFieldMapping,
    getSkippedSteps: () => number[],
    setCurrentStep: Dispatch<SetStateAction<number>>
) => {
    const { t } = useTranslation();
    const skippedSteps = getSkippedSteps();

    const steps = [
        {
            // Title and required fields
            id: 1,
            title: t('Stepper.Steps.Recipe.1.title'),
            content: <Step1 formik={formik} />,
            isOptional: stepFieldMapping[0].isOptional
        },
        {
            // Description
            id: 2,
            title: t('Stepper.Steps.Recipe.2.title'),
            content: <Step2 />,
            isOptional: stepFieldMapping[1].isOptional
        },
        {
            // PhotoPreview
            id: 3,
            title: t('Stepper.Steps.Recipe.3.title'),
            content: <Step3 />,
            isOptional: stepFieldMapping[2].isOptional
        },
        {
            // Ingredients
            id: 4,
            title: t('Stepper.Steps.Recipe.4.title'),
            content: <Step4 maxSteps={30} formik={formik} />,
            isOptional: stepFieldMapping[3].isOptional
        },
        {
            // Steps
            id: 5,
            title: t('Stepper.Steps.Recipe.5.title'),
            content: <Step5 maxSteps={20} formik={formik} />,
            isOptional: stepFieldMapping[4].isOptional
        },
        {
            // Tips
            id: 6,
            title: t('Stepper.Steps.Recipe.6.title'),
            content: <Step6 maxSteps={10} formik={formik} />,
            isOptional: stepFieldMapping[5].isOptional
        },
        {
            // Warnings
            id: 7,
            title: t('Stepper.Steps.Recipe.7.title'),
            content: <Step7 maxSteps={10} formik={formik} />,
            isOptional: stepFieldMapping[6].isOptional
        },
        {
            // Url
            id: 8,
            title: t('Stepper.Steps.Recipe.8.title'),
            content: <Step8 />,
            isOptional: stepFieldMapping[7].isOptional
        },
        {
            // Confirmation
            id: 9,
            title: t('Stepper.Steps.Recipe.9.title'),
            content: (
                <Step9
                    formik={formik}
                    skippedSteps={skippedSteps}
                    setCurrentStep={setCurrentStep}
                />
            ),
            isOptional: false
        }
    ];

    return steps;
};
