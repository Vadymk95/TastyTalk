import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Stepper } from '@root/components/ui';

import { Form, Formik } from 'formik';
import { GetAllSteps } from './Steps';

type CreateRecipeManuallyValues = {
    title: string;
};

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();

    const steps = GetAllSteps();

    const CreateRecipeManuallySchema = Yup.object().shape({
        title: Yup.string().required(
            t('Forms.CreateRecipeManuallyForm.requiredField')
        )
    });

    const onSubmit = (values: CreateRecipeManuallyValues) => {
        console.log(values);
    };

    const initialValues: CreateRecipeManuallyValues = {
        title: ''
    };

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            <Formik
                preventDefault
                validationSchema={CreateRecipeManuallySchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form>
                        <Stepper steps={steps} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
