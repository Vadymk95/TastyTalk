import { FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
    skippedSteps: number[];
}

export const Step9: FC<StepProps> = ({ formik, skippedSteps }) => {
    const { t } = useTranslation();
    const { values } = formik;

    console.log(values);
    console.log(skippedSteps);

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.9.description')}</h3>
            <ul>
                {skippedSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>

            <Button>предпросмотр</Button>
        </section>
    );
};
