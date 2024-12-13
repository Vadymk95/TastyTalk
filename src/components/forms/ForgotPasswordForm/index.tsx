import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, Input } from '@root/components/ui';
import { useAuthStore } from '@root/store';

export const ForgotPasswordForm: FC = () => {
    const { t } = useTranslation();
    const { loading } = useAuthStore();

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Forms.ForgotPasswordForm.emailNotValid'))
            .required(t('Forms.ForgotPasswordForm.requiredField'))
    });

    const initialValues = {
        email: ''
    };

    const handleForgotPassword = async (values: { email: string }) => {
        console.log(values);
    };

    return (
        <Formik
            preventDefault
            initialValues={initialValues}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleForgotPassword}
            validateOnBlur
        >
            {() => (
                <Form className="relative">
                    <Input
                        className="input-wrapper"
                        name="email"
                        type="email"
                        placeholder={t(
                            'Forms.ForgotPasswordForm.emailPlaceholder'
                        )}
                        isRequired
                        label={t('Forms.ForgotPasswordForm.email')}
                    />

                    <Button
                        size="large"
                        variant="primary"
                        className="w-full"
                        type="submit"
                        disabled={loading}
                    >
                        {t('Forms.ForgotPasswordForm.resetPassword')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
