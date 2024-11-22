import { Form, Formik } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Query, RecipeTypingEffect } from '@root/components/common';
import {
    Button,
    ErrorCard,
    Loader,
    Textarea,
    Tooltip
} from '@root/components/ui';
import { useAuthStore } from '@root/store';
import { RecipeContext } from '@root/types';

import {
    faBookmark,
    faRepeat,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { exampleRecipe } from './example';

type CreateRecipeWithAIFormValues = {
    query: string;
};

export const CreateRecipeWithAIForm: FC = () => {
    const { t } = useTranslation();
    const { loading, error, clearError } = useAuthStore();
    const [message, setMessage] = useState<string>('');
    const [recipe, setRecipe] = useState<RecipeContext | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const showRecipe = recipe && message;

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [recipe]);

    const handleGenerateRecipe = async (
        values: CreateRecipeWithAIFormValues,
        { resetForm }: any
    ) => {
        // add local storage
        setMessage(values.query);
        setRecipe(exampleRecipe);
        resetForm();
    };

    const handleClearRecipe = () => {
        setMessage('');
        setRecipe(null);
    };

    const handleSaveRecipe = () => {
        console.log('Save recipe');
    };

    const RecipeSchema = Yup.object().shape({
        query: Yup.string()
            .required(t('Forms.CreateRecipeWithAIForm.requiredField'))
            .min(2, t('Forms.CreateRecipeWithAIForm.tooShort'))
            .max(500, t('Forms.CreateRecipeWithAIForm.tooLong'))
    });

    const initialValues = {
        query: ''
    };

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <div className="flex flex-col h-full max-w-4xl gap-6 mx-auto">
            {showRecipe ? (
                <>
                    <div className="flex-grow overflow-y-auto">
                        <Query query={message} className="mb-6" />
                        <RecipeTypingEffect recipe={recipe} />

                        {/* temporary */}
                        {/* <div ref={chatEndRef} /> */}
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
                                onClick={handleSaveRecipe}
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

                                {error && <ErrorCard errorMessage={error} />}

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
        </div>
    );
};
