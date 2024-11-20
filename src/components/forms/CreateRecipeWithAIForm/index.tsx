import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Loader, Textarea } from '@root/components/ui';
import { useAuthStore } from '@root/store';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CreateRecipeWithAIFormValues = {
    query: string;
};

export const CreateRecipeWithAIForm: FC = () => {
    const { t } = useTranslation();
    const { loading, error, clearError } = useAuthStore();

    const handleCreateRecipe = async (values: CreateRecipeWithAIFormValues) => {
        console.log(values);
    };

    const RecipeSchema = Yup.object().shape({
        query: Yup.string().required(
            t('Forms.CreateRecipeWithAIForm.requiredField')
        )
    });

    const initialValues = {
        query: ''
    };

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <Formik
            preventDefault
            initialValues={initialValues}
            validationSchema={RecipeSchema}
            onSubmit={handleCreateRecipe}
        >
            {() => (
                <Form>
                    <section className="flex flex-col gap-6 max-w-xl mx-auto">
                        <Textarea
                            name="query"
                            size="large"
                            maxLength={500}
                            label={t('Forms.CreateRecipeWithAIForm.label')}
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
                                        <FontAwesomeIcon icon={faUtensils} />
                                        {t('Forms.CreateRecipeWithAIForm.find')}
                                        <FontAwesomeIcon icon={faUtensils} />
                                    </p>
                                )}
                            </Button>
                        </div>

                        {/* Успех */}
                    </section>
                </Form>
            )}
        </Formik>
    );
};
