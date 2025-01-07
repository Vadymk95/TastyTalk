import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Input, SuccessCard } from '@root/components/ui';
import { emailValidationRegExp } from '@root/constants/regExps';
import { useErrorsMessage } from '@root/hooks/useErrorsMessage';
import { useAuthStore } from '@root/store/authStore';

interface EditEmailFormProps {
    handleCloseModal: () => void;
}

export const EditEmailForm: FC<EditEmailFormProps> = ({ handleCloseModal }) => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const { loading, userProfile, editEmail, error, clearError } =
        useAuthStore();

    const EmailSchema = Yup.object().shape({
        email: Yup.string(),
        newEmail: Yup.string()
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
        newEmail: '',
        password: ''
    };

    const handleSubmit = async (values: {
        newEmail: string;
        password: string;
    }) => {
        if (values.newEmail === userProfile?.email) {
            return;
        }

        const success = await editEmail(values.newEmail, values.password);

        if (success) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                handleCloseModal();
            }, 3000);
        }
    };

    const editEmailError = useErrorsMessage(
        error || t('General.somethingWentWrong')
    );

    const handleClose = () => {
        clearError();
        handleCloseModal();
    };

    return (
        <Formik
            preventDefault
            validateOnBlur
            validateOnChange
            initialValues={initialValues}
            validationSchema={EmailSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting, values }) => (
                <Form>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('Forms.EditEmailForm.description')}
                    </p>

                    <Input
                        className="input-wrapper"
                        name="email"
                        type="email"
                        disabled
                        label={t('Forms.EditEmailForm.editEmail')}
                        placeholder={t(
                            'Forms.EditEmailForm.editEmailPlaceholder'
                        )}
                    />

                    <Input
                        className="input-wrapper"
                        name="newEmail"
                        type="email"
                        isRequired
                        label={t('Forms.EditEmailForm.newEmail')}
                        placeholder={t(
                            'Forms.EditEmailForm.newEmailPlaceholder'
                        )}
                    />

                    <Input
                        className="input-wrapper"
                        name="password"
                        type="password"
                        placeholder="******"
                        isRequired
                        label={t('Forms.EditEmailForm.password')}
                    />

                    <div className="flex justify-end space-x-4">
                        <Button onClick={handleClose}>
                            <span>{t('General.cancel')}</span>
                        </Button>

                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={
                                !isValid ||
                                isSubmitting ||
                                loading ||
                                values.newEmail === userProfile?.email
                            }
                        >
                            <span>{t('General.confirm')}</span>
                        </Button>
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
