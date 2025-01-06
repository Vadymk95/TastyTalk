import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Input } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';

type DeleteAccountFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

interface DeleteAccountFormProps {
    handleCloseModal: () => void;
}

export const DeleteAccountForm: FC<DeleteAccountFormProps> = ({
    handleCloseModal
}) => {
    const { t } = useTranslation();
    const { deleteUserAccount, loading, error, clearError } = useAuthStore();
    const [showSuccess, setShowSuccess] = useState(false);

    const DeleteAccountSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Forms.DeleteAccountForm.invalidEmail'))
            .required(t('Forms.DeleteAccountForm.requiredField')),
        password: Yup.string()
            .min(6, t('Forms.DeleteAccountForm.passwordMinLength'))
            .required(t('Forms.DeleteAccountForm.requiredField')),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref('password')],
                t('Forms.DeleteAccountForm.passwordsMustMatch')
            )
            .required(t('Forms.DeleteAccountForm.requiredField'))
    });

    const initialValues: DeleteAccountFormValues = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const onSubmit = async (values: DeleteAccountFormValues) => {
        const success = await deleteUserAccount(values.email, values.password);
        if (success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                handleCloseModal();
            }, 3000);
        }
    };

    const handleClose = () => {
        handleCloseModal();
        clearError();
    };

    return (
        <Formik
            preventDefault
            validationSchema={DeleteAccountSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('Forms.DeleteAccountForm.description')}
                    </p>

                    <div className="space-y-6">
                        <Input
                            className="auth-input-wrapper"
                            type="email"
                            isRequired
                            name="email"
                            placeholder={t('Forms.DeleteAccountForm.email')}
                            label={t('Forms.DeleteAccountForm.email')}
                        />

                        <Input
                            className="auth-input-wrapper"
                            type="password"
                            isRequired
                            name="password"
                            placeholder={t('Forms.DeleteAccountForm.password')}
                            label={t('Forms.DeleteAccountForm.password')}
                        />

                        <Input
                            className="auth-input-wrapper"
                            type="password"
                            isRequired
                            name="confirmPassword"
                            placeholder={t(
                                'Forms.DeleteAccountForm.confirmPassword'
                            )}
                            label={t('Forms.DeleteAccountForm.confirmPassword')}
                        />

                        {error && <ErrorCard errorMessage={error} />}

                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleClose}
                            >
                                {t('Forms.DeleteAccountForm.cancel', 'Cancel')}
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {t('Forms.DeleteAccountForm.delete', 'Delete')}
                            </Button>
                        </div>

                        {showSuccess && (
                            <p className="text-green-500 mt-4">
                                {t(
                                    'Forms.DeleteAccountForm.successMessage',
                                    'Your account has been successfully deleted.'
                                )}
                            </p>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
