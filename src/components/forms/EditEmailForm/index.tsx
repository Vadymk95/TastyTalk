import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Input, SuccessCard } from '@root/components/ui';
import { emailValidationRegExp } from '@root/constants/regExps';
import { useErrorsMessage } from '@root/hooks/useErrorsMessage';
import { useAuthStore } from '@root/store/authStore';

import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EditEmailFormProps {
    className?: string;
}

export const EditEmailForm: FC<EditEmailFormProps> = ({ className = '' }) => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const { loading, userProfile, editEmail, error, clearError } =
        useAuthStore();

    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .min(6, t('Forms.EditEmailForm.emailMinLength'))
            .max(50, t('Forms.EditEmailForm.emailMaxLength'))
            .matches(
                emailValidationRegExp,
                t('Forms.EditEmailForm.emailNotValid')
            ),
        password: Yup.string()
            .min(6, t('Forms.EditEmailForm.passwordMinLength'))
            .required(t('Forms.EditEmailForm.requiredField'))
    });

    const initialValues = {
        email: userProfile?.email || '',
        password: ''
    };

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        const success = await editEmail(values.email, values.password);

        if (success) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    const editEmailError = useErrorsMessage(
        error || t('General.somethingWentWrong')
    );

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <Formik
            preventDefault
            validateOnBlur
            validateOnChange
            initialValues={initialValues}
            validationSchema={EmailSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <div className={className}>
                        <Input
                            className="mb-4"
                            name="email"
                            type="email"
                            isRequired
                            label={t('Forms.EditEmailForm.editEmail')}
                            placeholder={t(
                                'Forms.EditEmailForm.editEmailPlaceholder'
                            )}
                        />

                        <Input
                            name="password"
                            type="password"
                            placeholder="******"
                            isRequired
                            label={t('Forms.EditEmailForm.password')}
                        />

                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                className="flex gap-2 items-center"
                                onClick={() => {}}
                            >
                                <FontAwesomeIcon icon={faCancel} />
                                <span>{t('General.cancel')}</span>
                            </Button>

                            <Button
                                className="flex gap-2 items-center"
                                type="submit"
                                variant="secondary"
                                disabled={!isValid || isSubmitting || loading}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                <span>{t('General.confirm')}</span>
                            </Button>
                        </div>
                    </div>

                    {showSuccess && (
                        <SuccessCard
                            className="mt-4"
                            successMessage={t(
                                'Forms.EditEmailForm.successMessage'
                            )}
                        />
                    )}

                    {error && (
                        <ErrorCard
                            className="mt-4"
                            errorMessage={editEmailError}
                        />
                    )}
                </Form>
            )}
        </Formik>
    );
};
