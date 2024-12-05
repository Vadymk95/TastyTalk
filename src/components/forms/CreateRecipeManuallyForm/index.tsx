import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { StepperWelcomeModal } from '@root/components/modals';
import { Loader, Stepper } from '@root/components/ui';
import { extractYouTubeVideoId } from '@root/helpers';
import { routes } from '@root/router/routes';
import { useRecipeStore, useTemporaryRecipeStore } from '@root/store';
import { Recipe as RecipeType } from '@root/types';

import { GetAllSteps } from './Steps';

export type StepFieldMapping = Record<
    number,
    { fields: Array<keyof RecipeType>; isOptional: boolean }
>;

const defaultFormValues: RecipeType = {
    title: '',
    difficulty: null,
    categories: null,
    cookingTime: '',
    description: '',
    previewPhoto: null,
    ingredients: null,
    steps: [''],
    tips: [''],
    warnings: [''],
    videoUrl: '',
    id: '',
    aiGenerated: false
};

export const CreateRecipeManuallyForm: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addRecipe, loading } = useRecipeStore();
    const { currentStep, manualFormData, setCurrentStep, resetManualForm } =
        useTemporaryRecipeStore();

    const CreateRecipeManuallySchema = Yup.object().shape({
        title: Yup.string()
            .min(3, t('Forms.CreateRecipeManuallyForm.min'))
            .max(50, t('Forms.CreateRecipeManuallyForm.max'))
            .required(t('Forms.CreateRecipeManuallyForm.requiredField'))
            .nullable(),
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
        cookingTime: Yup.string()
            .matches(
                /^\d{1,3}$/,
                t('Forms.CreateRecipeManuallyForm.invalidCookingTime')
            )
            .required(t('Forms.CreateRecipeManuallyForm.requiredField')),
        description: Yup.string()
            .min(3, t('Forms.CreateRecipeManuallyForm.min'))
            .nullable(),
        previewPhoto: Yup.mixed()
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
            .of(
                Yup.lazy((value) =>
                    typeof value === 'string'
                        ? Yup.string()
                              .min(3, t('Forms.CreateRecipeManuallyForm.min'))
                              .max(50, t('Forms.CreateRecipeManuallyForm.max'))
                              .required(
                                  t(
                                      'Forms.CreateRecipeManuallyForm.requiredField'
                                  )
                              )
                              .nullable()
                        : Yup.object().shape({
                              category: Yup.string()
                                  .min(
                                      3,
                                      t('Forms.CreateRecipeManuallyForm.min')
                                  )
                                  .max(
                                      50,
                                      t('Forms.CreateRecipeManuallyForm.max')
                                  )
                                  .required(
                                      t(
                                          'Forms.CreateRecipeManuallyForm.requiredField'
                                      )
                                  ),
                              categoryIngredients: Yup.array().of(
                                  Yup.string()
                                      .min(
                                          3,
                                          t(
                                              'Forms.CreateRecipeManuallyForm.min'
                                          )
                                      )
                                      .max(
                                          50,
                                          t(
                                              'Forms.CreateRecipeManuallyForm.max'
                                          )
                                      )
                                      .required(
                                          t(
                                              'Forms.CreateRecipeManuallyForm.requiredField'
                                          )
                                      )
                              )
                          })
                )
            )
            .required(t('Forms.CreateRecipeManuallyForm.requiredField')),
        steps: Yup.array()
            .of(Yup.string().min(3, t('Forms.CreateRecipeManuallyForm.min')))
            .required(t('Forms.CreateRecipeManuallyForm.requiredField'))
            .max(20, t('Forms.CreateRecipeManuallyForm.maxSteps')),
        tips: Yup.array().of(
            Yup.string()
                .min(3, t('Forms.CreateRecipeManuallyForm.min'))
                .nullable()
                .when('$isStepActive', {
                    is: (isStepActive: boolean) => isStepActive,
                    then: (schema) =>
                        schema.required(
                            t('Forms.CreateRecipeManuallyForm.requiredField')
                        ),
                    otherwise: (schema) => schema
                })
                .nullable()
        ),
        warnings: Yup.array().of(
            Yup.string()
                .min(3, t('Forms.CreateRecipeManuallyForm.min'))
                .nullable()
                .when('$isStepActive', {
                    is: (isStepActive: boolean) => isStepActive,
                    then: (schema) =>
                        schema.required(
                            t('Forms.CreateRecipeManuallyForm.requiredField')
                        ),
                    otherwise: (schema) => schema
                })
                .nullable()
        ),
        videoUrl: Yup.string()
            .url(t('Forms.CreateRecipeManuallyForm.invalidUrl'))
            .test(
                'isValidYouTubeUrl',
                t('General.invalidYouTubeUrl'),
                (value) => {
                    if (!value) return true;
                    return !!extractYouTubeVideoId(value);
                }
            )
            .nullable()
    });

    const onSubmit = async (values: RecipeType, { resetForm }: any) => {
        try {
            await addRecipe(values);
            resetManualForm();
            resetForm({ values: defaultFormValues });
            navigate(routes.profile);
        } catch (error) {
            console.error('Failed to add recipe:', error);
        }
    };

    const initialValues: RecipeType = {
        ...defaultFormValues,
        ...manualFormData
    };

    const stepFieldMapping: StepFieldMapping = {
        0: {
            fields: ['title', 'difficulty', 'categories', 'cookingTime'],
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

    return (
        <div className="relative flex flex-col h-full max-w-4xl gap-6 mx-auto">
            {loading && <Loader fullscreen />}

            <Formik
                preventDefault
                validationSchema={CreateRecipeManuallySchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnChange
                validateOnBlur
            >
                {(formik) => {
                    const isStepValid = (stepIndex: number): boolean => {
                        const stepData = stepFieldMapping[stepIndex];

                        if (!stepData) {
                            return false;
                        }

                        const { fields } = stepData;

                        return fields.every((field) => {
                            const value = formik.values[field];

                            if (field === 'ingredients') {
                                if (
                                    !Array.isArray(value) ||
                                    value.length === 0
                                ) {
                                    return false;
                                }

                                return value.every((item) => {
                                    if (typeof item === 'string') {
                                        return (
                                            item.trim() !== '' &&
                                            !formik.errors[field]
                                        );
                                    } else if (
                                        typeof item === 'object' &&
                                        'category' in item &&
                                        'categoryIngredients' in item
                                    ) {
                                        const {
                                            category,
                                            categoryIngredients
                                        } = item;
                                        const isCategoryValid =
                                            typeof category === 'string' &&
                                            category.trim() !== '' &&
                                            !formik.errors[field];
                                        const areSubIngredientsValid =
                                            Array.isArray(
                                                categoryIngredients
                                            ) &&
                                            categoryIngredients.length > 0 &&
                                            categoryIngredients.every(
                                                (subItem) =>
                                                    typeof subItem ===
                                                        'string' &&
                                                    subItem.trim() !== '' &&
                                                    !formik.errors[field]
                                            );
                                        return (
                                            isCategoryValid &&
                                            areSubIngredientsValid
                                        );
                                    }
                                    return false;
                                });
                            }

                            if (Array.isArray(value)) {
                                return (
                                    value.length > 0 &&
                                    value.every(
                                        (item) => item !== null && item !== ''
                                    ) &&
                                    !formik.errors[field]
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

                        const hasEnteredData = fields.some((field) => {
                            const value = formik.values[field];

                            if (Array.isArray(value)) {
                                return (
                                    value.length > 0 &&
                                    value.some(
                                        (item) =>
                                            item !== null &&
                                            typeof item === 'string' &&
                                            (item as string).trim() !== ''
                                    )
                                );
                            }

                            return (
                                value !== null && value !== '' && value !== 0
                            );
                        });

                        if (hasEnteredData) {
                            return false;
                        }

                        return true;
                    };

                    const onReset = () => {
                        resetManualForm();
                        formik.resetForm({ values: defaultFormValues });
                    };

                    return (
                        <Form>
                            <Stepper
                                steps={GetAllSteps(
                                    formik,
                                    stepFieldMapping,
                                    getSkippedSteps,
                                    setCurrentStep
                                )}
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                onReset={onReset}
                                isStepValid={isStepValid}
                                canSkipStep={canSkipStep}
                            />
                        </Form>
                    );
                }}
            </Formik>

            <StepperWelcomeModal />
        </div>
    );
};
