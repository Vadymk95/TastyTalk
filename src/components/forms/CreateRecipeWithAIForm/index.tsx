import { Form, Formik } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { RecipeViewer } from '@root/components/common';
import { Button, ErrorCard, Loader, Textarea } from '@root/components/ui';
import { useAuthStore } from '@root/store';
import { RecipeContext } from '@root/types';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { exampleRecipe } from './example';

type CreateRecipeWithAIFormValues = {
    query: string;
};

export const CreateRecipeWithAIForm: FC = () => {
    const { t } = useTranslation();
    const { loading, error, clearError } = useAuthStore();
    const [messages, setMessages] = useState<string[]>([]);
    const [recipe, setRecipe] = useState<RecipeContext | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [recipe]);

    const handleCreateRecipe = async (
        values: CreateRecipeWithAIFormValues,
        { resetForm }: any
    ) => {
        // Добавляем сообщение пользователя
        setMessages((prev) => [...prev, `👤: ${values.query}`]);

        // Добавляем индикатор загрузки
        setMessages((prev) => [...prev, `🤖:`]);

        // Симулируем ответ бота
        setTimeout(() => {
            setMessages((prev) => [...prev.slice(0, -1), `🤖:`]);

            // Обновляем контекст рецепта
            // setRecipe((prev) => ({
            //     ...(prev || {
            //         title: 'Новый рецепт',
            //         ingredients: [],
            //         steps: [],
            //         aiGenerated: true
            //     }),
            //     ingredients: [...(prev?.ingredients || []), values.query]
            // }));

            setRecipe(exampleRecipe);

            resetForm(); // Сбрасываем форму
        }, 2000);
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
            <>
                {/* Чат */}
                <div className="flex-grow overflow-y-auto">
                    {recipe && (
                        <RecipeViewer messages={messages} recipe={recipe} />
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Форма */}
                <Formik
                    preventDefault
                    initialValues={initialValues}
                    validationSchema={RecipeSchema}
                    onSubmit={handleCreateRecipe}
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
            </>
        </div>
    );
};
