import { FieldArray, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
    Button,
    Checkbox,
    ErrorCard,
    FormikSelect,
    Input,
    PhoneNumberInput,
    PhotoUpload,
    SuccessCard,
    Textarea,
    UsernameInput
} from '@root/components/ui';
import { countries } from '@root/constants/countries';
import { validatePhoneNumber } from '@root/helpers/validatePhoneNumber';
import { useErrorsMessage } from '@root/hooks/useErrorsMessage';
import { useAuthStore } from '@root/store/authStore';
import { UpdateProfileData } from '@root/types';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditProfileForm: FC = () => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [countryCode, setCountryCode] = useState('');
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
            .max(16, t('Forms.EditProfileForm.usernameMaxLength'))
            .required(t('Forms.EditProfileForm.requiredField')),
        firstName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.EditProfileForm.firstNameInvalid')
            )
            .min(2, t('Forms.EditProfileForm.firstNameMinLength'))
            .max(16, t('Forms.EditProfileForm.firstNameMaxLength'))
            .required(t('Forms.EditProfileForm.requiredField')),
        lastName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('Forms.EditProfileForm.lastNameInvalid')
            )
            .min(2, t('Forms.EditProfileForm.lastNameMinLength'))
            .max(16, t('Forms.EditProfileForm.lastNameMaxLength'))
            .required(t('Forms.EditProfileForm.requiredField')),
        bio: Yup.string().max(200, t('Forms.EditProfileForm.bioMaxLength')),
        country: Yup.string(),
        socialNetworks: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string()
                        .min(
                            2,
                            t(
                                'Forms.EditProfileForm.socialNetworkNameMinLength'
                            )
                        )
                        .max(
                            16,
                            t(
                                'Forms.EditProfileForm.socialNetworkNameMaxLength'
                            )
                        )
                        .required(
                            t('Forms.EditProfileForm.socialNetworkNameRequired')
                        ),
                    profileName: Yup.string()
                        .min(
                            2,
                            t(
                                'Forms.EditProfileForm.socialNetworkProfileNameMinLength'
                            )
                        )
                        .max(
                            16,
                            t(
                                'Forms.EditProfileForm.socialNetworkProfileNameMaxLength'
                            )
                        )
                        .required(
                            t(
                                'Forms.EditProfileForm.socialNetworkUsernameRequired'
                            )
                        )
                })
            )
            .max(5, t('Forms.EditProfileForm.maxSocialNetworks')),
        profileImage: Yup.mixed().nullable(),
        email: Yup.string(),
        phoneNumber: Yup.string()
            .min(10, t('Forms.EditProfileForm.phoneNumberNotValid'))
            .test(
                'is-valid-phone',
                t('Forms.EditProfileForm.phoneNumberNotValid'),
                (value) =>
                    !value || validatePhoneNumber(value || '', countryCode)
            ),
        showName: Yup.boolean(),
        showCountry: Yup.boolean()
    });

    const initialValues: UpdateProfileData = {
        username: userProfile?.username || '',
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        bio: userProfile?.bio || '',
        country: userProfile?.country || '',
        socialNetworks: userProfile?.socialNetworks || [],
        profileImage: userProfile?.profileImage || null,
        email: userProfile?.email || '',
        phoneNumber: '+' + userProfile?.phoneNumber || '',
        showCountry: userProfile?.showCountry || false,
        showName: userProfile?.showName || false
    };

    const usernameValidationSchema = EditProfileSchema.fields
        .username as Yup.StringSchema;

    const editProfileError = useErrorsMessage(
        error || t('General.somethingWentWrong')
    );

    const handleSetCode = (code: string) => {
        setCountryCode(code);
    };

    const onSubmit = async (values: UpdateProfileData) => {
        const success = await editProfile(values);
        if (success) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    const options = countries.map((country) => ({
        label: country.name,
        value: country.code
    }));

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

                    <section className="inline-flex sm:flex-col w-full items-center gap-8">
                        <div>
                            <PhotoUpload
                                src={values.profileImage as string}
                                onFileSelect={(file) =>
                                    setFieldValue('profileImage', file)
                                }
                            />
                        </div>

                        <div className="w-full space-y-8">
                            <Input
                                type="text"
                                isRequired
                                name="firstName"
                                placeholder={t(
                                    'Forms.EditProfileForm.firstName'
                                )}
                                label={t('Forms.EditProfileForm.firstName')}
                            />

                            <Input
                                isRequired
                                name="lastName"
                                type="text"
                                placeholder={t(
                                    'Forms.EditProfileForm.lastName'
                                )}
                                label={t('Forms.EditProfileForm.lastName')}
                            />

                            <Checkbox
                                name="showName"
                                onChange={(checked) =>
                                    setFieldValue('showName', checked)
                                }
                                label={t(
                                    'Forms.EditProfileForm.nameCheckboxLabel'
                                )}
                                checked={!!values.showName}
                            />

                            <UsernameInput
                                checkUsernameAvailability={
                                    checkUsernameAvailability
                                }
                                validationSchema={usernameValidationSchema}
                                isRequired
                                name="username"
                                label={t('Forms.EditProfileForm.username')}
                                currentUsername={userProfile?.username || ''}
                            />

                            <Input
                                name="email"
                                label={t('Forms.EditProfileForm.email')}
                                disabled
                            />

                            {userProfile?.phoneNumber ? (
                                <Input
                                    name="phoneNumber"
                                    label={t(
                                        'Forms.EditProfileForm.phoneNumber'
                                    )}
                                    disabled
                                />
                            ) : (
                                <div className="w-full">
                                    <PhoneNumberInput
                                        setCode={handleSetCode}
                                        code={countryCode}
                                        className="input-wrapper"
                                        name="phoneNumber"
                                        label={t(
                                            'Forms.EditProfileForm.phoneNumber'
                                        )}
                                        placeholder={t(
                                            'Forms.EditProfileForm.phoneNumber'
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="space-y-6">
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

                            <FormikSelect
                                searchable
                                name="country"
                                value={initialValues.country}
                                options={options}
                                placeholder={t(
                                    'Forms.EditProfileForm.selectCountry'
                                )}
                            />

                            {values.country && (
                                <Checkbox
                                    className="mt-4"
                                    name="showCountry"
                                    onChange={(checked) =>
                                        setFieldValue('showCountry', checked)
                                    }
                                    label={t(
                                        'Forms.EditProfileForm.countryCheckboxLabel'
                                    )}
                                    checked={!!values.showCountry}
                                />
                            )}
                        </div>

                        <FieldArray
                            name="socialNetworks"
                            render={(arrayHelpers) => (
                                <div>
                                    <label className="block mb-2 text-primary">
                                        <p>
                                            {t(
                                                'Forms.EditProfileForm.socialNetworks'
                                            )}
                                        </p>
                                        <span className="label text-xs">
                                            {t(
                                                'Forms.EditProfileForm.socialNetworksDescription'
                                            )}
                                        </span>
                                    </label>
                                    {(values.socialNetworks || []).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="flex sm:block items-center gap-4 mb-4"
                                            >
                                                <Input
                                                    type="text"
                                                    className="sm:mr-9 sm:mb-6"
                                                    name={`socialNetworks.${index}.name`}
                                                    placeholder={t(
                                                        'Forms.EditProfileForm.socialNetworkPlaceholder'
                                                    )}
                                                    label={t(
                                                        'Forms.EditProfileForm.socialNetworkName'
                                                    )}
                                                    isRequired
                                                    size="small"
                                                />
                                                <div className="flex items-end flex-1">
                                                    <Input
                                                        type="text"
                                                        name={`socialNetworks.${index}.profileName`}
                                                        placeholder={t(
                                                            'Forms.EditProfileForm.socialNetworkUsernamePlaceholder'
                                                        )}
                                                        label={t(
                                                            'Forms.EditProfileForm.socialNetworkUsername'
                                                        )}
                                                        isRequired
                                                        className="flex-1 mr-2"
                                                        size="small"
                                                    />
                                                    <Button
                                                        type="button"
                                                        className="flex-all-center"
                                                        size="small"
                                                        variant="close"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            size="xl"
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <Button
                                        type="button"
                                        size="small"
                                        disabled={
                                            (values.socialNetworks || [])
                                                .length >= 5
                                        }
                                        onClick={() =>
                                            arrayHelpers.push({
                                                name: '',
                                                profileName: ''
                                            })
                                        }
                                        className="mt-4"
                                    >
                                        {t(
                                            'Forms.EditProfileForm.addSocialNetwork'
                                        )}
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
                    </section>
                </Form>
            )}
        </Formik>
    );
};
