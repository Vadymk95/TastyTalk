import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Query, RecipeTypingEffect } from '@root/components/common';
import { VisibilityModal } from '@root/components/modals';
import { Button, Loader, Textarea, Tooltip } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { getProfileRoute } from '@root/helpers';
import {
    useAuthStore,
    useModalStore,
    useRecipeStore,
    useTemporaryRecipeStore
} from '@root/store';

import {
    faBookmark,
    faRepeat,
    faTriangleExclamation,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { exampleRecipe } from './example';

type CreateRecipeWithAIFormValues = {
    query: string;
};

export const CreateRecipeWithAIForm: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userProfile } = useAuthStore();
    const { openModal } = useModalStore();
    const { addRecipe, loading } = useRecipeStore();
    const {
        clearRecipe,
        currentRecipe,
        setCurrentRecipe,
        currentQuery,
        setCurrentQuery,
        clearQuery
    } = useTemporaryRecipeStore();
    const showRecipe = currentRecipe && currentQuery;

    const handleGenerateRecipe = async (
        values: CreateRecipeWithAIFormValues,
        { resetForm }: any
    ) => {
        try {
            setCurrentQuery(values.query);
            setCurrentRecipe(exampleRecipe);
            resetForm();
        } catch (error) {
            console.error('Error generating recipe:', error);
        }
    };

    const handleClearRecipe = () => {
        clearQuery();
        clearRecipe();
    };

    const handleSaveRecipe = async () => {
        try {
            if (currentRecipe) {
                await addRecipe(currentRecipe);
                clearQuery();
                clearRecipe();
                navigate(getProfileRoute(userProfile?.username));
            }
        } catch (error) {
            console.error('Error generating recipe:', error);
        }
    };

    const handleOpenSaveRecipeModal = () => openModal(ModalsEnum.Visibility);

    const RecipeSchema = Yup.object().shape({
        query: Yup.string()
            .required(t('Forms.CreateRecipeWithAIForm.requiredField'))
            .min(2, t('Forms.CreateRecipeWithAIForm.tooShort'))
            .max(500, t('Forms.CreateRecipeWithAIForm.tooLong'))
    });

    const initialValues = {
        query: ''
    };

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            {showRecipe ? (
                <>
                    <div className="flex-grow overflow-y-auto">
                        <Query query={currentQuery} className="mb-6" />
                        <RecipeTypingEffect recipe={currentRecipe} />
                        <div className="flex items-start gap-2 text-neutral-light">
                            <FontAwesomeIcon
                                className="pt-1"
                                icon={faTriangleExclamation}
                            />
                            <p className="text-sm">
                                {t('Forms.CreateRecipeWithAIForm.disclaimer')}
                            </p>
                        </div>
                    </div>

                    <div className="flex-all-center sm:flex-col sm:justify-center gap-6">
                        <Tooltip
                            text={t(
                                'Forms.CreateRecipeWithAIForm.tryAnotherDescription'
                            )}
                        >
                            <Button
                                className="flex-all-center gap-3"
                                onClick={handleClearRecipe}
                                size="large"
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                                <span>
                                    {t(
                                        'Forms.CreateRecipeWithAIForm.tryAnother'
                                    )}
                                </span>
                            </Button>
                        </Tooltip>
                        <Tooltip
                            text={t(
                                'Forms.CreateRecipeWithAIForm.saveRecipeDescription'
                            )}
                        >
                            <Button
                                className="flex-all-center gap-3"
                                onClick={handleOpenSaveRecipeModal}
                                size="large"
                                variant="secondary"
                            >
                                <FontAwesomeIcon icon={faBookmark} />
                                <span>
                                    {t(
                                        'Forms.CreateRecipeWithAIForm.saveRecipe'
                                    )}
                                </span>
                            </Button>
                        </Tooltip>
                    </div>
                </>
            ) : (
                <Formik
                    preventDefault
                    initialValues={initialValues}
                    validationSchema={RecipeSchema}
                    onSubmit={handleGenerateRecipe}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                                <Textarea
                                    name="query"
                                    size="large"
                                    maxLength={500}
                                    label={t(
                                        'Forms.CreateRecipeWithAIForm.label'
                                    )}
                                    placeholder={t(
                                        'Forms.CreateRecipeWithAIForm.placeholder'
                                    )}
                                />

                                <div className="flex justify-center">
                                    <Button
                                        variant="secondary"
                                        size="large"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            <p className="inline-flex gap-4 items-center">
                                                <FontAwesomeIcon
                                                    icon={faUtensils}
                                                />
                                                {t(
                                                    'Forms.CreateRecipeWithAIForm.find'
                                                )}
                                                <FontAwesomeIcon
                                                    icon={faUtensils}
                                                />
                                            </p>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            <VisibilityModal type="recipe" handleSave={handleSaveRecipe} />
        </div>
    );
};
