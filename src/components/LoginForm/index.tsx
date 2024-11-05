import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { ErrorCard } from '@root/components';
import { Button, Image, Input, Link } from '@root/components/ui';
import { useGetAuthErrorMessage } from '@root/hooks';
import { useAuthStore } from '@root/store/authStore';

import googleLogo from '@root/assets/images/google_logo.png';

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormProps = {
    signUpAction: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ signUpAction }) => {
    const { t } = useTranslation();
    const { signInWithEmail, signInWithGoogle, loading, error, clearError } =
        useAuthStore();
    const authError = useGetAuthErrorMessage(error || t('somethingWentWrong'));

    const handleLoginSubmit = async (values: LoginFormValues) => {
        await signInWithEmail(values.email, values.password);
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('emailNotValid'))
            .required(t('requiredField')),
        password: Yup.string()
            .min(6, t('passwordMinLength'))
            .required(t('requiredField'))
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <Formik
            preventDefault
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleLoginSubmit(values)}
        >
            {() => (
                <Form>
                    <div className="mb-10">
                        <Button
                            size="large"
                            variant="secondary"
                            className="w-full flex-all-center gap-4"
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <Image
                                src={googleLogo}
                                className="w-6 h-6 text-xs flex-all-center"
                                alt="google-icon"
                            />
                            {t('signInWithGoogle')}
                        </Button>
                    </div>

                    <div className="divider" />

                    <Input
                        className="auth-input-wrapper"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        isRequired
                        label={t('email')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="password"
                        type="password"
                        placeholder="******"
                        isRequired
                        label={t('password')}
                    />

                    <div>
                        <Button
                            size="large"
                            className={`w-full ${error ? 'mb-5' : 'mb-10'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? t('General.loading')
                                : t('LoginForm.signIn')}
                        </Button>

                        {error && (
                            <div className="mb-10">
                                <ErrorCard errorMessage={authError} />
                            </div>
                        )}

                        <div className="text-center">
                            <span>
                                {t('LoginForm.dontHaveAccount')}{' '}
                                <Link
                                    className="underline"
                                    variant="secondary"
                                    onClick={signUpAction}
                                >
                                    {t('LoginForm.actionSignUp')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
