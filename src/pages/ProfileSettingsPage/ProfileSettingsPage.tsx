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
                {t('ProfileSettingsPage.title')}
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
                                {t('ProfileSettingsPage.personalInfo')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t('ProfileSettingsPage.infoDescription')}
                            </p>

                            <div className="space-y-8">
                                <Input
                                    type="text"
                                    isRequired
                                    name="firstName"
                                    placeholder={t(
                                        'ProfileSettingsPage.firstName'
                                    )}
                                    label={t('ProfileSettingsPage.firstName')}
                                />

                                <Input
                                    isRequired
                                    name="lastName"
                                    type="text"
                                    placeholder={t(
                                        'ProfileSettingsPage.lastName'
                                    )}
                                    label={t('ProfileSettingsPage.lastName')}
                                />

                                <UsernameInput
                                    checkUsernameAvailability={
                                        checkUsernameAvailability
                                    }
                                    validationSchema={usernameValidationSchema}
                                    isRequired
                                    name="username"
                                    label={t('ProfileSettingsPage.username')}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {t('ProfileSettingsPage.save')}
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.changeLanguageTitle')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t(
                                    'ProfileSettingsPage.changeLanguageDescription'
                                )}
                            </p>
                            <Button variant="accent">
                                {t('ProfileSettingsPage.changeLanguageButton')}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.logOut')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t('ProfileSettingsPage.logOutDescription')}
                            </p>
                            <Button variant="secondary">
                                {t('ProfileSettingsPage.logOutButton')}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.support')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t('ProfileSettingsPage.supportDescription')}
                            </p>
                            <Button variant="accent">
                                {t('ProfileSettingsPage.contactSupport')}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.changePassword')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t('ProfileSettingsPage.passwordDescription')}
                            </p>
                            <Button variant="secondary">
                                {t('ProfileSettingsPage.changePasswordButton')}
                            </Button>
                        </section>

                        <section className="plate">
                            <h2 className="text-xl font-semibold text-primary mb-4">
                                {t('ProfileSettingsPage.deleteAccount')}
                            </h2>
                            <p className="text-sm text-neutral-dark mb-4">
                                {t('ProfileSettingsPage.deleteDescription')}
                            </p>
                            <Button>
                                {t('ProfileSettingsPage.deleteButton')}
                            </Button>
                        </section>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileSettingsPage;
