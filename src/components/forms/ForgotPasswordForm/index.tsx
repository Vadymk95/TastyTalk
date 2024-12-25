import { auth } from '@root/firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Input, SuccessCard } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';

export const ForgotPasswordForm: FC<{ onClose: () => void }> = ({
    onClose
}) => {
    const { t } = useTranslation();
    const { loading } = useAuthStore();

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Forms.ForgotPasswordForm.emailNotValid'))
            .required(t('Forms.ForgotPasswordForm.requiredField'))
    });

    const initialValues = {
        email: ''
    };

    const handleForgotPassword = async (values: { email: string }) => {
        try {
            setErrorMessage(null);
            setSuccessMessage(null);

            await sendPasswordResetEmail(auth, values.email);

            setSuccessMessage(t('Forms.ForgotPasswordForm.successMessage'));

            setTimeout(() => {
                onClose();
            }, 5000);
        } catch (error: any) {
            console.error('Password reset error:', error);
            setErrorMessage(
                error.message || t('Forms.ForgotPasswordForm.errorMessage')
            );
        }
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

                    {successMessage && (
                        <SuccessCard
                            className="mt-4"
                            successMessage={successMessage}
                        />
                    )}

                    {errorMessage && (
                        <ErrorCard
                            className="mt-4"
                            errorMessage={errorMessage}
                        />
                    )}
                </Form>
            )}
        </Formik>
    );
};
