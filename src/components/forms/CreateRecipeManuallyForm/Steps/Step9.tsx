import { FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';

import { CreateRecipeManuallyValues } from '..';

interface StepProps {
    formik: FormikProps<CreateRecipeManuallyValues>;
}

export const Step9: FC<StepProps> = ({ formik }) => {
    const { t } = useTranslation();
    const { values } = formik;

    console.log(values);

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.9.description')}</h3>

            <Button>предпросмотр</Button>
        </section>
    );
};
