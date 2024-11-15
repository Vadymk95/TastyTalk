import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
    Button,
    ErrorCard,
    Input,
    Link,
    UsernameInput
} from '@root/components/ui';
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
        loading,
        user,
        isRegistered
    } = useAuthStore();
    const isTemporaryUser = !!user && !isRegistered;

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

            navigation(routes.emailVerification);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[a-zA-Z0-9_]+$/, t('Forms.RegisterForm.usernameInvalid'))
            .matches(
                /[a-zA-Z]/,
                t('Forms.RegisterForm.usernameMustContainLetter')
            )
            .min(4, t('Forms.RegisterForm.usernameMinLength'))
            .required(t('Forms.RegisterForm.requiredField')),
        firstName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.RegisterForm.firstNameInvalid')
            )
            .min(2, t('Forms.RegisterForm.firstNameMinLength'))
            .required(t('Forms.RegisterForm.requiredField')),
        lastName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.RegisterForm.lastNameInvalid')
            )
            .min(2, t('Forms.RegisterForm.lastNameMinLength'))
            .required(t('Forms.RegisterForm.requiredField')),
        email: Yup.string()
            .email(t('Forms.RegisterForm.emailNotValid'))
            .required(t('Forms.RegisterForm.requiredField')),
        password: Yup.string()
            .min(6, t('Forms.RegisterForm.passwordMinLength'))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                t('Forms.RegisterForm.passwordComplexity')
            )
            .required(t('Forms.RegisterForm.requiredField')),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref('password')],
                t('Forms.RegisterForm.passwordsMustMatch')
            )
            .required(t('Forms.RegisterForm.requiredField'))
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    const initialValues: RegisterFormValues = {
        username: '',
        firstName: '',
        lastName: '',
        email: isTemporaryUser ? user?.email || '' : '',
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
                    <section className="flex gap-10 md:block">
                        <div className="w-full">
                            <UsernameInput
                                validationSchema={usernameValidationSchema}
                                className="auth-input-wrapper"
                                name="username"
                                label={t('Forms.RegisterForm.username')}
                                isRequired
                                checkUsernameAvailability={
                                    checkUsernameAvailability
                                }
                            />

                            <Input
                                className="auth-input-wrapper"
                                name="firstName"
                                type="text"
                                placeholder={t(
                                    'Forms.RegisterForm.enterYourName'
                                )}
                                isRequired
                                label={t('Forms.RegisterForm.firstName')}
                            />

                            <Input
                                className="auth-input-wrapper"
                                name="lastName"
                                type="text"
                                placeholder={t(
                                    'Forms.RegisterForm.enterYourLastName'
                                )}
                                isRequired
                                label={t('Forms.RegisterForm.lastName')}
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                className="auth-input-wrapper"
                                name="email"
                                type="email"
                                disabled={isTemporaryUser}
                                placeholder={t(
                                    'Forms.RegisterForm.enterYourEmail'
                                )}
                                isRequired
                                label={t('Forms.RegisterForm.email')}
                            />

                            <Input
                                className="auth-input-wrapper"
                                name="password"
                                type="password"
                                placeholder="******"
                                isRequired
                                label={t('Forms.RegisterForm.password')}
                            />

                            <Input
                                className="auth-input-wrapper"
                                name="confirmPassword"
                                type="password"
                                placeholder="******"
                                isRequired
                                label={t('Forms.RegisterForm.confirmPassword')}
                            />
                        </div>
                    </section>

                    <section>
                        <Button
                            size="large"
                            className={`w-full ${error ? 'mb-5 md:mb-3' : 'mb-8 md:mb-7'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {t('Forms.RegisterForm.signUp')}
                        </Button>

                        {error && (
                            <div className="mb-8 md:mb-7 duration-300">
                                <ErrorCard errorMessage={authError} />
                            </div>
                        )}

                        <div className="text-center">
                            {isTemporaryUser ? (
                                <span>
                                    {t('Forms.RegisterForm.registerFinish')}
                                </span>
                            ) : (
                                <span>
                                    {t('Forms.RegisterForm.haveAccount')}{' '}
                                    <Link
                                        className="underline"
                                        variant="secondary"
                                        onClick={signInAction}
                                    >
                                        {t('Forms.RegisterForm.actionSignIn')}
                                    </Link>
                                </span>
                            )}
                        </div>
                    </section>
                </Form>
            )}
        </Formik>
    );
};