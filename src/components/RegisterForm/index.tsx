import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ErrorCard } from '@root/components';
import { Button, Input, Link, UsernameInput } from '@root/components/ui';
import { useGetAuthErrorMessage } from '@root/hooks';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

type RegisterFormValues = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type RegisterFormProps = {
    signInAction: () => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ signInAction }) => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const {
        registerWithEmailAndProfile,
        checkUsernameAvailability,
        error,
        clearError,
        loading
    } = useAuthStore();
    const authError = useGetAuthErrorMessage(
        error || t('General.somethingWentWrong')
    );

    const handleRegisterSubmit = async (values: RegisterFormValues) => {
        clearError();
        try {
            await registerWithEmailAndProfile(
                values.email,
                values.username,
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
        username: Yup.string()
            .matches(/^[a-zA-Z0-9_]+$/, t('RegisterForm.usernameInvalid'))
            .matches(/[a-zA-Z]/, t('RegisterForm.usernameMustContainLetter'))
            .min(4, t('RegisterForm.usernameMinLength'))
            .required(t('RegisterForm.requiredField')),
        firstName: Yup.string()
            .matches(/^[a-zA-Zа-яА-Я]+$/, t('RegisterForm.firstNameInvalid'))
            .min(2, t('RegisterForm.firstNameMinLength'))
            .required(t('RegisterForm.requiredField')),
        lastName: Yup.string()
            .matches(/^[a-zA-Zа-яА-Я]+$/, t('RegisterForm.lastNameInvalid'))
            .min(2, t('RegisterForm.lastNameMinLength'))
            .required(t('RegisterForm.requiredField')),
        email: Yup.string()
            .email(t('RegisterForm.emailNotValid'))
            .required(t('RegisterForm.requiredField')),
        password: Yup.string()
            .min(6, t('RegisterForm.passwordMinLength'))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                t('RegisterForm.passwordComplexity')
            )
            .required(t('RegisterForm.requiredField')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('RegisterForm.passwordsMustMatch'))
            .required(t('RegisterForm.requiredField'))
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    const initialValues: RegisterFormValues = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const usernameValidationSchema = RegisterSchema.fields
        .username as Yup.StringSchema;

    return (
        <Formik
            preventDefault
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => handleRegisterSubmit(values)}
        >
            {() => (
                <Form>
                    <div className="flex gap-10 md:block">
                        <div className="w-full">
                            <UsernameInput
                                validationSchema={usernameValidationSchema}
                                className="auth-input-wrapper"
                                name="username"
                                label={t('RegisterForm.username')}
                                isRequired
                                checkUsernameAvailability={
                                    checkUsernameAvailability
                                }
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
                                placeholder={t(
                                    'RegisterForm.enterYourLastName'
                                )}
                                isRequired
                                label={t('RegisterForm.lastName')}
                            />
                        </div>

                        <div className="w-full">
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
                        </div>
                    </div>

                    <div>
                        <Button
                            size="large"
                            className={`w-full ${error ? 'mb-5 md:mb-3' : 'mb-8 md:mb-7'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {t('RegisterForm.signUp')}
                        </Button>

                        {error && (
                            <div className="mb-8 md:mb-7 duration-300">
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
