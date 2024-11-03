import { Button, Input } from '@root/components/ui';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type LoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm: FC = () => {
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

                    <div className="flex justify-end">
                        <Button type="submit">{t('signIn')}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
