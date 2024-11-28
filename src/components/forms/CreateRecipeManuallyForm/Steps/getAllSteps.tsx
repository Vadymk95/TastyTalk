import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

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
import { CreateRecipeManuallyValues } from '..';

export const GetAllSteps = (
    formik: FormikProps<CreateRecipeManuallyValues>
) => {
    const { t } = useTranslation();

    const steps = [
        {
            id: 1,
            title: t('Stepper.Steps.Recipe.1.title'),
            content: <Step1 formik={formik} />
        },
        {
            id: 2,
            title: t('Stepper.Steps.Recipe.2.title'),
            content: <Step2 />,
            isOptional: true
        },
        {
            id: 3,
            title: t('Stepper.Steps.Recipe.3.title'),
            content: <Step3 />,
            isOptional: true
        },
        {
            id: 4,
            title: t('Stepper.Steps.Recipe.4.title'),
            content: <Step4 formik={formik} />
        },
        { id: 5, title: t('Stepper.Steps.Recipe.5.title'), content: <Step5 /> },
        {
            id: 6,
            title: t('Stepper.Steps.Recipe.6.title'),
            content: <Step6 />,
            isOptional: true
        },
        {
            id: 7,
            title: t('Stepper.Steps.Recipe.7.title'),
            content: <Step7 />,
            isOptional: true
        },
        {
            id: 8,
            title: t('Stepper.Steps.Recipe.8.title'),
            content: <Step8 />,
            isOptional: true
        },
        { id: 9, title: t('Stepper.Steps.Recipe.9.title'), content: <Step9 /> }
    ];

    return steps;
};
