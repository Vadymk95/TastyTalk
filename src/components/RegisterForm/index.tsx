import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ErrorCard } from '@root/components';
import { Button, Input, Link } from '@root/components/ui';
import { useGetAuthErrorMessage } from '@root/hooks';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

type RegisterFormValues = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

type RegisterFormProps = {
    signInAction: () => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ signInAction }) => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const { registerWithEmailAndProfile, error, clearError, loading } =
        useAuthStore();
    const authError = useGetAuthErrorMessage(
        error || t('General.somethingWentWrong')
    );

    const handleRegisterSubmit = async (values: RegisterFormValues) => {
        clearError();
        try {
            await registerWithEmailAndProfile(
                values.email,
                values.password,
                values.firstName,
                values.lastName
            );

            navigation(routes.home);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('RegisterForm.emailNotValid'))
            .required(t('RegisterForm.requiredField')),
        firstName: Yup.string()
            .min(2, t('RegisterForm.firstNameMinLength'))
            .required(t('RegisterForm.requiredField')),
        lastName: Yup.string()
            .min(2, t('RegisterForm.lastNameMinLength'))
            .required(t('RegisterForm.requiredField')),
        password: Yup.string()
            .min(6, t('RegisterForm.passwordMinLength'))
            .required(t('RegisterForm.requiredField')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('RegisterForm.passwordsMustMatch'))
            .required(t('RegisterForm.requiredField'))
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <Formik
            preventDefault
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => handleRegisterSubmit(values)}
        >
            {() => (
                <Form>
                    <Input
                        className="auth-input-wrapper"
                        name="email"
                        type="email"
                        placeholder={t('RegisterForm.enterYourEmail')}
                        isRequired
                        label={t('RegisterForm.email')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="firstName"
                        type="text"
                        placeholder={t('RegisterForm.enterYourName')}
                        isRequired
                        label={t('RegisterForm.firstName')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="lastName"
                        type="text"
                        placeholder={t('RegisterForm.enterYourLastName')}
                        isRequired
                        label={t('RegisterForm.lastName')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="password"
                        type="password"
                        placeholder="******"
                        isRequired
                        label={t('RegisterForm.password')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="confirmPassword"
                        type="password"
                        placeholder="******"
                        isRequired
                        label={t('RegisterForm.confirmPassword')}
                    />

                    <div>
                        <Button
                            size="large"
                            className={`w-full ${error ? 'mb-5' : 'mb-10'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {t('RegisterForm.signUp')}
                        </Button>

                        {error && (
                            <div className="mb-10">
                                <ErrorCard errorMessage={authError} />
                            </div>
                        )}

                        <div className="text-center">
                            <span>
                                {t('RegisterForm.haveAccount')}{' '}
                                <Link
                                    className="underline"
                                    variant="secondary"
                                    onClick={signInAction}
                                >
                                    {t('RegisterForm.actionSignIn')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
