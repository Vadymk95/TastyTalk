import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
    Button,
    ErrorCard,
    Input,
    SuccessCard,
    UsernameInput
} from '@root/components/ui';
import { useGetAuthErrorMessage } from '@root/hooks';
import { useAuthStore } from '@root/store/authStore';

type EditProfileFormValues = {
    username: string;
    firstName: string;
    lastName: string;
};

export const EditProfileForm: FC = () => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const {
        userProfile,
        loading,
        error,
        checkUsernameAvailability,
        clearError,
        editProfile
    } = useAuthStore();

    const EditProfileSchema = Yup.object().shape({
        username: Yup.string()
            .matches(
                /^[a-zA-Z0-9_]+$/,
                t('Forms.EditProfileForm.usernameInvalid')
            )
            .matches(
                /[a-zA-Z]/,
                t('Forms.EditProfileForm.usernameMustContainLetter')
            )
            .min(4, t('Forms.EditProfileForm.usernameMinLength'))
            .required(t('Forms.EditProfileForm.requiredField')),
        firstName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.EditProfileForm.firstNameInvalid')
            )
            .min(2, t('Forms.EditProfileForm.firstNameMinLength'))
            .required(t('Forms.EditProfileForm.requiredField')),
        lastName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.EditProfileForm.lastNameInvalid')
            )
            .min(2, t('Forms.EditProfileForm.lastNameMinLength'))
            .required(t('Forms.EditProfileForm.requiredField'))
    });

    const initialValues: EditProfileFormValues = {
        username: userProfile?.username || '',
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || ''
    };

    const usernameValidationSchema = EditProfileSchema.fields
        .username as Yup.StringSchema;

    const editProfileError = useGetAuthErrorMessage(
        error || t('General.somethingWentWrong')
    );

    const onSubmit = async (values: EditProfileFormValues) => {
        const success = await editProfile(values);
        if (success) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    useEffect(() => {
        clearError();
    }, [clearError]);

    return (
        <Formik
            preventDefault
            validationSchema={EditProfileSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {() => (
                <Form className="plate">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('Forms.EditProfileForm.personalInfo')}
                    </h2>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('Forms.EditProfileForm.infoDescription')}
                    </p>

                    <div className="space-y-8">
                        <Input
                            className="auth-input-wrapper"
                            type="text"
                            isRequired
                            name="firstName"
                            placeholder={t('Forms.EditProfileForm.firstName')}
                            label={t('Forms.EditProfileForm.firstName')}
                        />

                        <Input
                            isRequired
                            name="lastName"
                            type="text"
                            placeholder={t('Forms.EditProfileForm.lastName')}
                            label={t('Forms.EditProfileForm.lastName')}
                        />

                        <UsernameInput
                            checkUsernameAvailability={
                                checkUsernameAvailability
                            }
                            validationSchema={usernameValidationSchema}
                            isRequired
                            name="username"
                            label={t('Forms.EditProfileForm.username')}
                        />

                        <div className="flex justify-end">
                            <Button
                                variant="secondary"
                                type="submit"
                                disabled={loading}
                            >
                                {t('Forms.EditProfileForm.save')}
                            </Button>
                        </div>

                        {showSuccess && (
                            <SuccessCard
                                successMessage={t(
                                    'Forms.EditProfileForm.successMessage'
                                )}
                            />
                        )}

                        {error && <ErrorCard errorMessage={editProfileError} />}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
