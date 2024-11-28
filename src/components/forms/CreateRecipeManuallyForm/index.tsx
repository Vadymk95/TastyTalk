import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Stepper } from '@root/components/ui';
import { Difficulty } from '@root/types';

import { GetAllSteps } from './Steps';

import { Recipe } from '../../common';
import { exampleRecipe } from '../CreateRecipeWithAIForm/example';

export type CreateRecipeManuallyValues = {
    title: string;
    difficulty: null | Difficulty;
    categories: null | string[];
    cookingTime: number;
    description?: string;
    previewPhoto?: string | File | null;
    ingredients: string[] | null;
};

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();

    const CreateRecipeManuallySchema = Yup.object().shape({
        title: Yup.string().required(
            t('Forms.CreateRecipeManuallyForm.requiredField')
        ),
        difficulty: Yup.string().required(
            t('Forms.CreateRecipeManuallyForm.requiredField')
        ),
        categories: Yup.array()
            .of(Yup.string())
            .required(t('Forms.CreateRecipeManuallyForm.requiredField')),
        cookingTime: Yup.number().required(
            t('Forms.CreateRecipeManuallyForm.requiredField')
        ),
        description: Yup.string(),
        previewPhoto: Yup.mixed()
            .nullable()
            .nullable()
            .test(
                'fileType',
                t('Forms.CreateRecipeManuallyForm.invalidFileType'),
                (value) => {
                    if (!value) return true;
                    const file = value as File;
                    return ['image/jpeg', 'image/png', 'image/gif'].includes(
                        file.type
                    );
                }
            )
            .test(
                'fileSize',
                t('Forms.CreateRecipeManuallyForm.fileTooLarge'),
                (value) => {
                    if (!value) return true;
                    const file = value as File;
                    return file.size <= 5 * 1024 * 1024;
                }
            ),
        ingredients: Yup.array()
            .of(Yup.string())
            .required(t('Forms.CreateRecipeManuallyForm.requiredField'))
            .max(30, t('Forms.CreateRecipeManuallyForm.maxIngredients'))
    });

    const onSubmit = (values: CreateRecipeManuallyValues) => {
        console.log(values);
    };

    const initialValues: CreateRecipeManuallyValues = {
        title: '',
        difficulty: null,
        categories: null,
        cookingTime: 0,
        description: '',
        previewPhoto: null,
        ingredients: null
    };

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            <Formik
                preventDefault
                validationSchema={CreateRecipeManuallySchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <Stepper steps={GetAllSteps(formik)} />

                        <div className="mt-12">
                            <Recipe recipe={exampleRecipe} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
