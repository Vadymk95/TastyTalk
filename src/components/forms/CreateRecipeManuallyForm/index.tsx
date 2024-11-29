import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Stepper } from '@root/components/ui';
import { Category, Difficulty } from '@root/types';

import { GetAllSteps } from './Steps';

import { Recipe } from '../../common';
import { exampleRecipe } from '../CreateRecipeWithAIForm/example';

export type CreateRecipeManuallyValues = {
    title: string;
    difficulty: null | Difficulty;
    categories: null | Category[];
    cookingTime: number;
    description?: string;
    previewPhoto?: string | File | null;
    ingredients: string[] | null;
    steps: string[] | null;
    tips?: string[] | null;
    warnings?: string[] | null;
    videoUrl?: string;
};

type StepFieldMapping = Record<number, Array<keyof CreateRecipeManuallyValues>>;

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
            .of(
                Yup.object().shape({
                    id: Yup.string().required(
                        t('Forms.CreateRecipeManuallyForm.requiredField')
                    ),
                    name: Yup.string().required(
                        t('Forms.CreateRecipeManuallyForm.requiredField')
                    ),
                    group: Yup.string().required(
                        t('Forms.CreateRecipeManuallyForm.requiredField')
                    )
                })
            )
            .nullable()
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
            .max(30, t('Forms.CreateRecipeManuallyForm.maxIngredients')),
        steps: Yup.array()
            .of(Yup.string())
            .required(t('Forms.CreateRecipeManuallyForm.requiredField'))
            .max(10, t('Forms.CreateRecipeManuallyForm.maxSteps')),
        tips: Yup.array()
            .of(Yup.string())
            .max(10, t('Forms.CreateRecipeManuallyForm.maxTips')),
        warnings: Yup.array()
            .of(Yup.string())
            .max(10, t('Forms.CreateRecipeManuallyForm.maxWarnings')),
        videoUrl: Yup.string().url(
            t('Forms.CreateRecipeManuallyForm.invalidUrl')
        )
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
        ingredients: [''],
        steps: [''],
        tips: [''],
        warnings: [''],
        videoUrl: ''
    };

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            <Formik
                preventDefault
                validationSchema={CreateRecipeManuallySchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    const stepFieldMapping: StepFieldMapping = {
                        0: ['title', 'difficulty', 'categories', 'cookingTime'],
                        1: ['description'],
                        2: ['previewPhoto'],
                        3: ['ingredients'],
                        4: ['steps'],
                        5: ['tips'],
                        6: ['warnings'],
                        7: ['videoUrl']
                    };

                    const isStepValid = (stepIndex: number): boolean => {
                        const fields = stepFieldMapping[stepIndex] || [];

                        return fields.every(
                            (field) =>
                                !formik.errors[field] &&
                                formik.values[field] !== null &&
                                formik.values[field] !== '' &&
                                formik.values[field] !== 0
                        );
                    };
                    return (
                        <Form>
                            <Stepper
                                steps={GetAllSteps(formik)}
                                onReset={formik.resetForm}
                                isStepValid={isStepValid}
                            />

                            <div className="mt-12">
                                <Recipe recipe={exampleRecipe} />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
