import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ErrorCard } from '@root/components';
import { Button, Image, Input, Link } from '@root/components/ui';
import { useGetAuthErrorMessage } from '@root/hooks';
import { routes } from '@root/router/routes';
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
    const navigate = useNavigate();
    const { signInWithEmail, signInWithGoogle, loading, error, clearError } =
        useAuthStore();
    const authError = useGetAuthErrorMessage(
        error || t('General.somethingWentWrong')
    );
    const handleRedirectToMainPage = () => navigate(routes.home);

    const handleLoginSubmit = async (values: LoginFormValues) => {
        await signInWithEmail(
            values.email,
            values.password,
            handleRedirectToMainPage
        );
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle(handleRedirectToMainPage);

        if (!error) navigate(routes.home);
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('LoginForm.emailNotValid'))
            .required(t('LoginForm.requiredField')),
        password: Yup.string()
            .min(6, t('LoginForm.passwordMinLength'))
            .required(t('LoginForm.requiredField'))
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
                    <div className="mb-10 md:mb-5">
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
                            {t('LoginForm.signInWithGoogle')}
                        </Button>
                    </div>

                    <div className="divider" />

                    <Input
                        className="auth-input-wrapper"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        isRequired
                        label={t('LoginForm.email')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="password"
                        type="password"
                        placeholder="******"
                        isRequired
                        label={t('LoginForm.password')}
                    />

                    <div>
                        <Button
                            size="large"
                            className={`w-full ${error ? 'mb-5 md:mb-3' : 'mb-10 md:mb-5'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? t('General.loading')
                                : t('LoginForm.signIn')}
                        </Button>

                        {error && (
                            <div className="mb-10 md:mb-5">
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
