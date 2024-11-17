import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EditProfileForm } from '@root/components/forms';
import {
    ChangePasswordModal,
    DeleteAccountModal,
    PricingModal,
    SupportModal
} from '@root/components/modals';
import { Button, Select } from '@root/components/ui';
import { languages } from '@root/constants/languages';
import { ModalsEnum } from '@root/constants/modals';
import { useAuthStore, useLanguageStore, useModalStore } from '@root/store';

const ProfileSettingsPage: FC = () => {
    const { t } = useTranslation();
    const { signOutUser } = useAuthStore();
    const { openModal } = useModalStore();
    const { setLanguage } = useLanguageStore();

    const handleOpenModal = (modalId: string) => {
        openModal(modalId);
    };

    const handleSelect = async (option: string) => {
        const selectedLang = languages.find((lang) => lang.name === option);
        await setLanguage(selectedLang?.code || 'en');
    };

    return (
        <div className="flex flex-col items-center p-6 lg:p-12 sm:!p-4 max-w-3xl mx-auto gap-y-8 sm:gap-y-4">
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

                <Select
                    options={languages.map((lang) => lang.name)}
                    placeholder={t('ProfileSettingsPage.changeLanguageButton')}
                    searchable={true}
                    onSelect={handleSelect}
                />
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
                <Button
                    onClick={() => handleOpenModal(ModalsEnum.Support)}
                    variant="accent"
                >
                    {t('ProfileSettingsPage.contactSupport')}
                </Button>
            </section>

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.pricing')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.pricingDescription')}
                </p>
                <Button
                    onClick={() => handleOpenModal(ModalsEnum.Pricing)}
                    variant="secondary"
                >
                    {t('ProfileSettingsPage.pricingAction')}
                </Button>
            </section>

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.changePassword')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.passwordDescription')}
                </p>
                <Button
                    onClick={() => handleOpenModal(ModalsEnum.ChangePassword)}
                    variant="secondary"
                >
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
                <Button
                    onClick={() => handleOpenModal(ModalsEnum.DeleteAccount)}
                >
                    {t('ProfileSettingsPage.deleteButton')}
                </Button>
            </section>

            <SupportModal />
            <ChangePasswordModal />
            <DeleteAccountModal />
            <PricingModal />
        </div>
    );
};

export default ProfileSettingsPage;
