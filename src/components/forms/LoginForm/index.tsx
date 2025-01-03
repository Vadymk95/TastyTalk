import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ForgotPasswordModal } from '@root/components/modals/ForgotPasswordModal';
import { Button, ErrorCard, Image, Input, Link } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useGetAuthErrorMessage } from '@root/hooks/useGetAuthErrorMessage';
import { routes } from '@root/router/routes';
import { useAuthStore, useModalStore } from '@root/store';

import googleLogo from '@root/assets/images/google_logo.png';

type LoginFormValues = {
    loginData: string;
    password: string;
};

type LoginFormProps = {
    setIsSignIn: (value: boolean) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ setIsSignIn }) => {
    const { t } = useTranslation();
    const { openModal } = useModalStore();
    const navigate = useNavigate();
    const { signIn, signInWithGoogle, loading, error, clearError } =
        useAuthStore();

    const authError = useGetAuthErrorMessage(
        error || t('General.somethingWentWrong')
    );

    const signUpAction = () => setIsSignIn(false);

    const handleRedirectAfterLogin = (
        shouldRedirectAfterLogin = true
    ): void => {
        if (shouldRedirectAfterLogin) {
            navigate(routes.greeting);
        } else {
            setIsSignIn(false);
        }
    };

    const handleLoginSubmit = async (values: LoginFormValues) => {
        const shouldRedirect = await signIn(values.loginData, values.password);

        if (shouldRedirect === null) return;

        handleRedirectAfterLogin(shouldRedirect);
    };

    const handleGoogleLogin = async () => {
        const shouldRedirect = await signInWithGoogle();

        if (shouldRedirect === null) return;

        handleRedirectAfterLogin(shouldRedirect);
    };

    const LoginSchema = Yup.object().shape({
        loginData: Yup.string().required(t('Forms.LoginForm.requiredField')),
        password: Yup.string()
            .min(6, t('Forms.LoginForm.passwordMinLength'))
            .required(t('Forms.LoginForm.requiredField'))
    });

    const handleModalOpen = () => openModal(ModalsEnum.ForgotPassword);

    const initialValues: LoginFormValues = {
        loginData: '',
        password: ''
    };

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <>
            <Formik
                preventDefault
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
                validateOnBlur
            >
                {() => (
                    <Form>
                        <div className="mb-8 md:mb-7">
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
                                {t('Forms.LoginForm.signInWithGoogle')}
                            </Button>
                        </div>

                        <div className="divider" />

                        <div className="auth-input-wrapper">
                            <Input
                                name="loginData"
                                type="text"
                                placeholder={t('Forms.LoginForm.login')}
                                isRequired
                                label={t('Forms.LoginForm.login')}
                            />
                            <p className="mt-3 text-xs label">
                                {t('Forms.LoginForm.loginDescription')}
                            </p>
                        </div>

                        <Input
                            className="auth-input-wrapper"
                            name="password"
                            type="password"
                            placeholder="******"
                            isRequired
                            label={t('Forms.LoginForm.password')}
                        />

                        <section>
                            <Button
                                size="large"
                                className={`w-full ${error ? 'mb-5 md:mb-3' : 'mb-8 md:mb-7'}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? t('General.loading')
                                    : t('Forms.LoginForm.signIn')}
                            </Button>

                            {error && (
                                <div className="mb-8 md:mb-7 duration-300">
                                    <ErrorCard errorMessage={authError} />
                                </div>
                            )}

                            <div className="text-center">
                                <span>
                                    {t('Forms.LoginForm.dontHaveAccount')}{' '}
                                    <Link
                                        className="underline"
                                        variant="secondary"
                                        onClick={signUpAction}
                                    >
                                        {t('Forms.LoginForm.actionSignUp')}
                                    </Link>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="divider" />
                                <p className="text-center">{t('General.or')}</p>
                                <div className="divider" />
                            </div>

                            <div className="text-center">
                                <span>
                                    {t('Forms.LoginForm.forgotPassword')}{' '}
                                    <Link
                                        className="underline"
                                        variant="thirtiary"
                                        onClick={handleModalOpen}
                                    >
                                        {t('General.clickHere')}
                                    </Link>
                                </span>
                            </div>
                        </section>
                    </Form>
                )}
            </Formik>
            <ForgotPasswordModal />
        </>
    );
};
