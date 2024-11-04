import { Button, Input, Link } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormProps = {
    signUpAction: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ signUpAction }) => {
    const { t } = useTranslation();
    const { signInWithEmail, signInWithGoogle, loading } = useAuthStore();

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
                            <img
                                src="../../../public/google_logo.png"
                                className="w-6 h-6"
                                alt="google"
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
                            className="w-full mb-10"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? t('loading') : t('signIn')}
                        </Button>

                        <div className="text-center">
                            <span>
                                {t('dontHaveAccount')}{' '}
                                <Link
                                    className="underline"
                                    variant="secondary"
                                    onClick={signUpAction}
                                >
                                    {t('actionSignUp')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
