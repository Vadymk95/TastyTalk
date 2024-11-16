import { FieldArray, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
    Button,
    ErrorCard,
    FileUpload,
    Input,
    Select,
    SuccessCard,
    Textarea,
    UsernameInput
} from '@root/components/ui';
import { countries } from '@root/constants/countries';
import { useGetAuthErrorMessage } from '@root/hooks';
import { useAuthStore } from '@root/store/authStore';

type EditProfileFormValues = {
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    country: string;
    socialLinks: { name: string; url: string }[];
    profileImage: File | null;
};
//

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
            .required(t('Forms.EditProfileForm.requiredField')),
        bio: Yup.string().max(200, t('Forms.EditProfileForm.bioMaxLength')),
        country: Yup.string(),
        socialLinks: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(
                        t('Forms.EditProfileForm.linkNameRequired')
                    ),
                    url: Yup.string()
                        .url(t('Forms.EditProfileForm.invalidLink'))
                        .required(t('Forms.EditProfileForm.linkRequired'))
                })
            )
            .max(5, t('Forms.EditProfileForm.maxSocialLinks')),
        profileImage: Yup.mixed().nullable()
    });

    const initialValues: EditProfileFormValues = {
        username: userProfile?.username || '',
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        bio: userProfile?.bio || '',
        country: userProfile?.country || '',
        socialLinks: userProfile?.socialLinks || [
            { name: '', url: '' },
            { name: '', url: '' },
            { name: '', url: '' }
        ],
        profileImage: null
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
            {({ setFieldValue, values }) => (
                <Form className="plate">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('Forms.EditProfileForm.personalInfo')}
                    </h2>

                    <div className="space-y-8">
                        <div className="profile-image-section">
                            <FileUpload
                                onFileSelect={(file) =>
                                    setFieldValue('profileImage', file)
                                }
                            />
                        </div>

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

                        <h3 className="text-lg font-medium text-primary mt-8">
                            {t('Forms.EditProfileForm.additionalInfo')}
                        </h3>

                        <Textarea
                            name="bio"
                            placeholder={t('Forms.EditProfileForm.bio')}
                            label={t('Forms.EditProfileForm.bio')}
                            maxLength={200}
                        />

                        <div>
                            <label className="block">
                                {t('Forms.EditProfileForm.country')}
                            </label>

                            <Select
                                value={initialValues.country}
                                options={countries}
                                placeholder={t(
                                    'Forms.EditProfileForm.selectCountry'
                                )}
                                onSelect={(option) =>
                                    setFieldValue('country', option)
                                }
                            />
                        </div>

                        <FieldArray
                            name="socialLinks"
                            render={(arrayHelpers) => (
                                <div className="social-links">
                                    <label className="block mb-2 text-primary">
                                        {t('Forms.EditProfileForm.socialLinks')}
                                    </label>
                                    {values.socialLinks.map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex sm:block items-center gap-4 mb-4"
                                        >
                                            <Input
                                                type="text"
                                                className="sm:mr-9 sm:mb-2"
                                                name={`socialLinks.${index}.name`}
                                                placeholder={t(
                                                    'Forms.EditProfileForm.linkNamePlaceholder'
                                                )}
                                                label={t(
                                                    'Forms.EditProfileForm.linkName'
                                                )}
                                                isRequired
                                                size="small"
                                            />
                                            <div className="flex items-end flex-1">
                                                <Input
                                                    type="text"
                                                    name={`socialLinks.${index}.url`}
                                                    placeholder={t(
                                                        'Forms.EditProfileForm.linkPlaceholder'
                                                    )}
                                                    label={t(
                                                        'Forms.EditProfileForm.link'
                                                    )}
                                                    isRequired
                                                    className="flex-1 mr-2"
                                                    size="small"
                                                />
                                                <Button
                                                    type="button"
                                                    className="text-xl"
                                                    size="small"
                                                    variant="close"
                                                    onClick={() =>
                                                        arrayHelpers.remove(
                                                            index
                                                        )
                                                    }
                                                >
                                                    &times;
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        size="small"
                                        disabled={
                                            values.socialLinks.length >= 5
                                        }
                                        onClick={() =>
                                            arrayHelpers.push({
                                                name: '',
                                                url: ''
                                            })
                                        }
                                        className="mt-2"
                                    >
                                        {t('Forms.EditProfileForm.addLink')}
                                    </Button>
                                </div>
                            )}
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
