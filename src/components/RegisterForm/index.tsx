import { Button, Input, Link } from '@root/components/ui';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type RegisterFormValues = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

type RegisterFormProps = {
    signInAction: () => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ signInAction }) => {
    const { t } = useTranslation();
    const handleRegisterSubmit = (values: RegisterFormValues) => {
        console.log('Данные формы:', values);
    };

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('emailNotValid'))
            .required(t('requiredField')),
        firstName: Yup.string()
            .min(2, t('firstNameMinLength'))
            .required(t('requiredField')),
        lastName: Yup.string()
            .min(2, t('lastNameMinLength'))
            .required(t('requiredField')),
        password: Yup.string()
            .min(6, t('passwordMinLength'))
            .required(t('requiredField'))
    });

    return (
        <Formik
            preventDefault
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: ''
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
                        placeholder={t('enterYourEmail')}
                        isRequired
                        label={t('email')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="firstName"
                        type="text"
                        placeholder={t('enterYourName')}
                        isRequired
                        label={t('firstName')}
                    />

                    <Input
                        className="auth-input-wrapper"
                        name="lastName"
                        type="text"
                        placeholder={t('enterYourLastName')}
                        isRequired
                        label={t('lastName')}
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
                        >
                            {t('signUp')}
                        </Button>

                        <div className="text-center">
                            <span>
                                {t('haveAccount')}{' '}
                                <Link
                                    className="underline"
                                    variant="secondary"
                                    onClick={signInAction}
                                >
                                    {t('actionSignIn')}
                                </Link>
                            </span>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
