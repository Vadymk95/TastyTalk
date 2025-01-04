import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Input } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

interface PhoneVerificationFormProps {
    confirmationResult: any | null;
}

export const PhoneVerificationForm: FC<PhoneVerificationFormProps> = (
    confirmationResult
) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { confirmPhoneVerificationCode, loading } = useAuthStore();

    const handleSubmit = async (values: { verificationCode: string }) => {
        console.log('values:', values);
        try {
            console.log('confirmationResult:', confirmationResult);
            const success = await confirmPhoneVerificationCode(
                values.verificationCode,
                confirmationResult
            );

            if (!success) {
                console.error('Verification failed.');
                return;
            }

            const userProfile = useAuthStore.getState().userProfile;

            if (!userProfile) {
                console.error('User profile not found.');
                return;
            }

            navigate(routes.home);
        } catch (err: any) {
            console.error('Error verifying code:', err);
        }
    };

    const PhoneVerificationSchema = Yup.object().shape({
        verificationCode: Yup.string()
            .min(6, t('Forms.PhoneVerificationForm.codeLength'))
            .max(6, t('Forms.PhoneVerificationForm.codeLength'))
            .required(t('General.requiredField'))
    });

    const initialValues = {
        verificationCode: ''
    };

    return (
        <Formik
            preventDefault
            validateOnChange
            validateOnBlur
            validateOnMount
            initialValues={initialValues}
            validationSchema={PhoneVerificationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting }) => (
                <Form className="flex flex-col gap-6 text-start">
                    <Input
                        name="verificationCode"
                        label=""
                        placeholder="000000"
                        isRequired
                    />

                    <Button
                        disabled={!isValid || isSubmitting || loading}
                        variant="secondary"
                        type="submit"
                    >
                        {t('General.confirm')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
