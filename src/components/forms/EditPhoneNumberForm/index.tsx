import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, PhoneNumberInput } from '@root/components/ui';
import { validatePhoneNumber } from '@root/helpers/validatePhoneNumber';
import { useAuthStore } from '@root/store/authStore';

import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditPhoneNumberForm: FC = () => {
    const { t } = useTranslation();
    const { userProfile, loading } = useAuthStore();
    const [countryCode, setCountryCode] = useState('');

    const handleSubmit = async (values: { phoneNumber: string }) => {
        console.log(values);
    };

    const PhoneNumberSchema = Yup.object().shape({
        phoneNumber: Yup.string()
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
        phoneNumber: userProfile?.phoneNumber || ''
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
            {({ isValid, isSubmitting }) => (
                <Form>
                    <div className="w-full mt-6 text-start">
                        <PhoneNumberInput
                            name="phoneNumber"
                            label={t(
                                'Forms.EditPhoneNumberForm.editPhoneNumber'
                            )}
                            setCode={setCountryCode}
                            code={countryCode}
                        />

                        <div className="flex justify-center gap-2 mt-4">
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
                                disabled={!isValid || isSubmitting || loading}
                                variant="secondary"
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                <span>{t('General.confirm')}</span>
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
