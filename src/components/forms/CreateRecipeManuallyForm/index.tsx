import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Stepper } from '@root/components/ui';
import { Category, Difficulty } from '@root/types';

import { GetAllSteps } from './Steps';

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

export type StepFieldMapping = Record<
    number,
    { fields: Array<keyof CreateRecipeManuallyValues>; isOptional: boolean }
>;

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
                        0: {
                            fields: [
                                'title',
                                'difficulty',
                                'categories',
                                'cookingTime'
                            ],
                            isOptional: false
                        },
                        1: { fields: ['description'], isOptional: true },
                        2: { fields: ['previewPhoto'], isOptional: true },
                        3: { fields: ['ingredients'], isOptional: false },
                        4: { fields: ['steps'], isOptional: false },
                        5: { fields: ['tips'], isOptional: true },
                        6: { fields: ['warnings'], isOptional: true },
                        7: { fields: ['videoUrl'], isOptional: true }
                    };

                    const isStepValid = (stepIndex: number): boolean => {
                        const stepData = stepFieldMapping[stepIndex];

                        if (!stepData) {
                            return false;
                        }

                        const { fields } = stepData;

                        return fields.every((field) => {
                            const value = formik.values[field];

                            if (Array.isArray(value)) {
                                return (
                                    value.length > 0 &&
                                    value.every(
                                        (item) => item !== null && item !== ''
                                    )
                                );
                            }

                            return (
                                !formik.errors[field] &&
                                value !== null &&
                                value !== '' &&
                                value !== 0
                            );
                        });
                    };

                    const getSkippedSteps = (): number[] => {
                        return Object.keys(stepFieldMapping)
                            .map(Number)
                            .filter((stepIndex) => {
                                const stepData = stepFieldMapping[stepIndex];
                                const { fields } = stepData;

                                const isStepInvalid = fields.some((field) => {
                                    const value = formik.values[field];

                                    if (Array.isArray(value)) {
                                        return (
                                            value.length === 0 ||
                                            value.every(
                                                (item) =>
                                                    item !== null &&
                                                    typeof item === 'string' &&
                                                    (item as string).trim() ===
                                                        ''
                                            )
                                        );
                                    }

                                    return (
                                        value === null ||
                                        value === '' ||
                                        value === 0
                                    );
                                });

                                return isStepInvalid;
                            });
                    };

                    const canSkipStep = (stepIndex: number): boolean => {
                        const stepData = stepFieldMapping[stepIndex];
                        if (!stepData || !stepData.isOptional) {
                            return false;
                        }

                        const { fields } = stepData;

                        const hasInvalidData = fields.some((field) => {
                            const value = formik.values[field];

                            if (Array.isArray(value)) {
                                return (
                                    value.length > 0 &&
                                    value.some(
                                        (item) =>
                                            item === null ||
                                            (typeof item === 'string' &&
                                                (item as string).trim() === '')
                                    ) &&
                                    formik.errors[field]
                                );
                            }

                            return (
                                value !== null &&
                                value !== '' &&
                                formik.errors[field]
                            );
                        });

                        return !hasInvalidData;
                    };

                    return (
                        <Form>
                            <Stepper
                                steps={GetAllSteps(
                                    formik,
                                    stepFieldMapping,
                                    getSkippedSteps
                                )}
                                onReset={formik.resetForm}
                                isStepValid={isStepValid}
                                canSkipStep={canSkipStep}
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
