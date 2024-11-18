import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Loader, Textarea } from '@root/components/ui';
import { useAuthStore } from '@root/store';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CreateRecipeFormProps {
    withAI: boolean;
}

type CreateRecipeFormValues = {
    query: string;
};

export const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ withAI }) => {
    const { t } = useTranslation();
    const { loading, error, clearError } = useAuthStore();

    console.log(withAI);

    const handleCreateRecipe = async (values: CreateRecipeFormValues) => {
        console.log(values);
    };

    const RecipeSchema = Yup.object().shape({
        query: Yup.string().required(t('Forms.LoginForm.requiredField'))
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
                            placeholder={t('RecipeGenerator.inputPlaceholder')}
                            label={t('RecipeGenerator.inputLabel')}
                        />

                        {error && <ErrorCard errorMessage={error} />}

                        <div className="flex justify-center">
                            <Button
                                variant="primary"
                                size="large"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <p className="inline-flex gap-4 items-center">
                                        <FontAwesomeIcon icon={faUtensils} />
                                        {t('RecipeGenerator.generateButton')}
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