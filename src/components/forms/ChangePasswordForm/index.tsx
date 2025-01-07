import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, ErrorCard, Input, SuccessCard } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';

type ChangePasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

interface ChangePasswordFormProps {
    handleCloseModal: () => void;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
    handleCloseModal
}) => {
    const { t } = useTranslation();
    const { changePassword, loading, error, clearError } = useAuthStore();
    const [showSuccess, setShowSuccess] = useState(false);

    const ChangePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, t('Forms.ChangePasswordForm.passwordMinLength'))
            .required(t('Forms.ChangePasswordForm.requiredField')),
        newPassword: Yup.string()
            .min(6, t('Forms.ChangePasswordForm.passwordMinLength'))
            .required(t('Forms.ChangePasswordForm.requiredField')),
        confirmNewPassword: Yup.string()
            .oneOf(
                [Yup.ref('newPassword')],
                t('Forms.ChangePasswordForm.passwordsMustMatch')
            )
            .required(t('Forms.ChangePasswordForm.requiredField'))
    });

    const initialValues: ChangePasswordFormValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    const onSubmit = async (values: ChangePasswordFormValues) => {
        const success = await changePassword(
            values.currentPassword,
            values.newPassword
        );
        if (success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                handleCloseModal();
            }, 3000);
        }
    };

    const handleClose = () => {
        clearError();
        handleCloseModal();
    };

    return (
        <Formik
            validationSchema={ChangePasswordSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {() => (
                <Form>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('Forms.ChangePasswordForm.description')}
                    </p>

                    <div className="space-y-6">
                        <Input
                            className="input-wrapper"
                            type="password"
                            isRequired
                            name="currentPassword"
                            placeholder={t(
                                'Forms.ChangePasswordForm.currentPassword'
                            )}
                            label={t(
                                'Forms.ChangePasswordForm.currentPassword'
                            )}
                        />

                        <Input
                            className="input-wrapper"
                            type="password"
                            isRequired
                            name="newPassword"
                            placeholder={t(
                                'Forms.ChangePasswordForm.newPassword'
                            )}
                            label={t('Forms.ChangePasswordForm.newPassword')}
                        />

                        <Input
                            className="input-wrapper"
                            type="password"
                            isRequired
                            name="confirmNewPassword"
                            placeholder={t(
                                'Forms.ChangePasswordForm.confirmNewPassword'
                            )}
                            label={t(
                                'Forms.ChangePasswordForm.confirmNewPassword'
                            )}
                        />

                        {error && <ErrorCard errorMessage={error} />}

                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleClose}
                            >
                                {t('Forms.ChangePasswordForm.cancel')}
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {t('Forms.ChangePasswordForm.change')}
                            </Button>
                        </div>

                        {showSuccess && (
                            <SuccessCard
                                successMessage={t(
                                    'Forms.ChangePasswordForm.successMessage'
                                )}
                            />
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
