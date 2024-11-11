import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Button, Input, UsernameInput } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';

type EditProfileFormValues = {
    username: string;
    firstName: string;
    lastName: string;
};

const ProfileSettingsPage: FC = () => {
    const { t } = useTranslation();
    const { loading, checkUsernameAvailability } = useAuthStore();

    const EditProfileSchema = Yup.object().shape({
        username: Yup.string()
            .matches(
                /^[a-zA-Z0-9_]+$/,
                t('ProfileSettingsPage.usernameInvalid')
            )
            .matches(
                /[a-zA-Z]/,
                t('ProfileSettingsPage.usernameMustContainLetter')
            )
            .min(4, t('ProfileSettingsPage.usernameMinLength'))
            .required(t('ProfileSettingsPage.requiredField')),
        firstName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('ProfileSettingsPage.firstNameInvalid')
            )
            .min(2, t('ProfileSettingsPage.firstNameMinLength'))
            .required(t('ProfileSettingsPage.requiredField')),
        lastName: Yup.string()
            .matches(
                /^[a-zA-Zа-яА-Я]+$/,
                t('ProfileSettingsPage.lastNameInvalid')
            )
            .min(2, t('ProfileSettingsPage.lastNameMinLength'))
            .required(t('ProfileSettingsPage.requiredField'))
    });

    const initialValues: EditProfileFormValues = {
        username: '',
        firstName: '',
        lastName: ''
    };

    const usernameValidationSchema = EditProfileSchema.fields
        .username as Yup.StringSchema;

    return (
        <div className="flex flex-col items-center p-6 lg:p-12 sm:!p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-semibold text-white mb-8 sm:mb-4">
                {t('ProfileSettingsPage.title', 'Edit Profile')}
            </h1>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('Form Values:', values);
                }}
            >
                {() => (
                    <Form className="w-full space-y-8">
                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t(
                                    'ProfileSettingsPage.personalInfo',
                                    'Personal Information'
                                )}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.infoDescription',
                                    'Update your name, last name, and username'
                                )}
                            </p>

                            <div className="space-y-8">
                                <Input
                                    type="text"
                                    isRequired
                                    name="firstName"
                                    placeholder={t(
                                        'ProfileSettingsPage.firstName',
                                        'First Name'
                                    )}
                                    label={t(
                                        'ProfileSettingsPage.firstName',
                                        'First Name'
                                    )}
                                />

                                <Input
                                    isRequired
                                    name="lastName"
                                    type="text"
                                    placeholder={t(
                                        'ProfileSettingsPage.lastName',
                                        'Last Name'
                                    )}
                                    label={t(
                                        'ProfileSettingsPage.lastName',
                                        'Last Name'
                                    )}
                                />

                                <UsernameInput
                                    checkUsernameAvailability={
                                        checkUsernameAvailability
                                    }
                                    validationSchema={usernameValidationSchema}
                                    isRequired
                                    name="username"
                                    label={t(
                                        'ProfileSettingsPage.username',
                                        'Username'
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        className="px-8"
                                        size="large"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {t('ProfileSettingsPage.save', 'Save')}
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.logOut', 'Log Out')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.logOutDescription',
                                    'Log out of your account on this device'
                                )}
                            </p>
                            <Button variant="secondary">
                                {t(
                                    'ProfileSettingsPage.logOutButton',
                                    'Log Out'
                                )}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.support', 'Support')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.supportDescription',
                                    'If you have any questions or issues, contact support'
                                )}
                            </p>
                            <Button variant="secondary">
                                {t(
                                    'ProfileSettingsPage.contactSupport',
                                    'Contact Support'
                                )}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t(
                                    'ProfileSettingsPage.changePassword',
                                    'Change Password'
                                )}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.passwordDescription',
                                    'Update your password to keep your account secure'
                                )}
                            </p>
                            <Button>
                                {t(
                                    'ProfileSettingsPage.changePasswordButton',
                                    'Change Password'
                                )}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t(
                                    'ProfileSettingsPage.deleteAccount',
                                    'Delete Account'
                                )}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.deleteDescription',
                                    'Permanently delete your account. This action cannot be undone.'
                                )}
                            </p>
                            <Button>
                                {t(
                                    'ProfileSettingsPage.deleteButton',
                                    'Delete Account'
                                )}
                            </Button>
                        </section>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileSettingsPage;
