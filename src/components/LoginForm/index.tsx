import { Button, Input, Link } from '@root/components/ui';
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
    const handleLoginSubmit = (values: LoginFormValues) => {
        console.log('Данные формы:', values);
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

                    <div className="flex justify-between items-center">
                        <div className="inline-flex gap-2">
                            <span>{t('dontHaveAccount')}</span>
                            <Link variant="secondary" onClick={signUpAction}>
                                {t('actionSignUp')}
                            </Link>
                        </div>

                        <Button type="submit">{t('signIn')}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
