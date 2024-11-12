import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';
import { useAuthStore } from '@root/store/authStore';
import { EditProfileForm } from '@root/components';

const ProfileSettingsPage: FC = () => {
    const { t } = useTranslation();
    const { signOutUser } = useAuthStore();

    return (
        <div className="flex flex-col items-center p-6 lg:p-12 sm:!p-4 max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-white">
                {t('ProfileSettingsPage.title')}
            </h1>

            <section className="w-full">
                <EditProfileForm />
            </section>

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.changeLanguageTitle')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.changeLanguageDescription')}
                </p>
                <Button variant="accent">
                    {t('ProfileSettingsPage.changeLanguageButton')}
                </Button>
            </section>

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.logOut')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.logOutDescription')}
                </p>
                <Button onClick={signOutUser} variant="secondary">
                    {t('ProfileSettingsPage.logOutButton')}
                </Button>
            </section>

            <section className="plate w-full">
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

            <section className="plate w-full">
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

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.deleteAccount')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.deleteDescription')}
                </p>
                <Button>{t('ProfileSettingsPage.deleteButton')}</Button>
            </section>
        </div>
    );
};

export default ProfileSettingsPage;
