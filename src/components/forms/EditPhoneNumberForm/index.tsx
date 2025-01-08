import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
    Button,
    ErrorCard,
    Input,
    PhoneNumberInput,
    SuccessCard
} from '@root/components/ui';
import { validatePhoneNumber } from '@root/helpers/validatePhoneNumber';
import { useErrorsMessage } from '@root/hooks/useErrorsMessage';
import { useAuthStore } from '@root/store/authStore';

interface EditPhoneNumberFormProps {
    handleCloseModal: () => void;
}

export const EditPhoneNumberForm: FC<EditPhoneNumberFormProps> = ({
    handleCloseModal
}) => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const { userProfile, loading, clearError, error, editPhoneNumber } =
        useAuthStore();
    const [countryCode, setCountryCode] = useState('');

    const handleSubmit = async (values: {
        password: string;
        newPhoneNumber: string;
    }) => {
        if (values.newPhoneNumber === userProfile?.phoneNumber) {
            return;
        }

        const success = await editPhoneNumber(
            values.newPhoneNumber,
            values.password
        );

        if (success) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                handleCloseModal();
            }, 3000);
        }
    };

    const PhoneNumberSchema = Yup.object().shape({
        phoneNumber: Yup.string(),
        newPhoneNumber: Yup.string()
            .min(10, t('Forms.EditPhoneNumberForm.phoneNumberNotValid'))
            .test(
                'is-valid-phone',
                t('Forms.EditPhoneNumberForm.phoneNumberNotValid'),
                (value) =>
                    !value || validatePhoneNumber(value || '', countryCode)
            ),
        password: Yup.string()
            .min(6, t('Forms.EditPhoneNumberForm.passwordMinLength'))
            .required(t('Forms.EditPhoneNumberForm.requiredField'))
    });

    const initialValues = {
        phoneNumber: userProfile?.phoneNumber || '',
        newPhoneNumber: '',
        password: ''
    };

    const editPhoneNumberError = useErrorsMessage(
        error || t('General.somethingWentWrong')
    );

    const handleClose = () => {
        clearError();
        handleCloseModal();
    };

    return (
        <Formik
            preventDefault
            validateOnChange
            validateOnBlur
            initialValues={initialValues}
            validationSchema={PhoneNumberSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting, values }) => (
                <Form>
                    <div className="w-full mt-6 text-start">
                        <p className="text-sm text-neutral-dark mb-4">
                            {t('Forms.EditPhoneNumberForm.description')}
                        </p>

                        <Input
                            className="input-wrapper"
                            name="phoneNumber"
                            disabled
                            label={t(
                                'Forms.EditPhoneNumberForm.editPhoneNumber'
                            )}
                        />

                        <PhoneNumberInput
                            className="input-wrapper"
                            name="newPhoneNumber"
                            label={t(
                                'Forms.EditPhoneNumberForm.newPhoneNumber'
                            )}
                            setCode={setCountryCode}
                            code={countryCode}
                        />

                        <Input
                            className="input-wrapper"
                            name="password"
                            type="password"
                            placeholder="******"
                            isRequired
                            label={t('Forms.EditPhoneNumberForm.password')}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button onClick={handleClose}>
                                <span>{t('General.cancel')}</span>
                            </Button>

                            <Button
                                type="submit"
                                disabled={
                                    !isValid ||
                                    isSubmitting ||
                                    loading ||
                                    values.newPhoneNumber ===
                                        userProfile?.phoneNumber
                                }
                                variant="secondary"
                            >
                                <span>{t('General.confirm')}</span>
                            </Button>
                        </div>

                        {showSuccess && (
                            <SuccessCard
                                className="mt-4"
                                successMessage={t(
                                    'Forms.EditPhoneNumberForm.successMessage'
                                )}
                            />
                        )}

                        {error && (
                            <ErrorCard
                                className="mt-4"
                                errorMessage={editPhoneNumberError}
                            />
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
