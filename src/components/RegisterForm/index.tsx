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
            .required(t('RegisterForm.requiredField'))
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

                    <div>
                        <Button
                            size="large"
                            className="w-full mb-10"
                            type="submit"
                        >
                            {t('RegisterForm.signUp')}
                        </Button>

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
