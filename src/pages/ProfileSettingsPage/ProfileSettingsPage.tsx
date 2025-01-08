import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ProfileSettingsModals } from '@root/components/common/ProfileSettingsModals';
import { EditProfileForm } from '@root/components/forms';
import { Button, Select } from '@root/components/ui';
import { languages } from '@root/constants/languages';
import { ModalsEnum } from '@root/constants/modals';
import { routes } from '@root/router/routes';
import { useAuthStore, useLanguageStore, useModalStore } from '@root/store';

const ProfileSettingsPage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);
    const {
        signOutUser,
        resendVerificationEmail,
        userProfile,
        checkEmailVerificationStatus
    } = useAuthStore();
    const { openModal } = useModalStore();
    const { setLanguage } = useLanguageStore();

    const shouldShowVerificationPhoneNumber =
        (!userProfile?.verified &&
            (userProfile?.phoneNumber ||
                userProfile?.verificationMethod === 'phone')) ||
        (userProfile?.verificationMethod === 'email' &&
            userProfile?.phoneNumber);

    const handleOpenModal = (modalId: string) => {
        openModal(modalId);
    };

    const handleSelect = async (value: string | null) => {
        const selectedLang = languages.find((lang) => lang.code === value);
        await setLanguage(selectedLang?.code || 'en');
    };

    const handleResendEmail = async () => {
        if (isCooldown) return;

        try {
            await resendVerificationEmail();
            setIsCooldown(true);
            const timer = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsCooldown(false);
                        setCooldownTime(60);
                        return 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } catch (error: any) {
            console.error('Error when resending the email:', error);
        }
    };

    const handleVerifyPhoneNumber = () => {
        navigate(routes.phoneNumberVerification);
    };

    const verificationMethod = (method: 'email' | 'phone') => {
        return (
            userProfile?.verified && userProfile?.verificationMethod !== method
        );
    };

    useEffect(() => {
        if (!userProfile?.verified) {
            const intervalId = setInterval(async () => {
                await checkEmailVerificationStatus();
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [userProfile?.verified, checkEmailVerificationStatus]);

    const options = languages.map((lang) => ({
        label: lang.name,
        value: lang.code
    }));

    return (
        <div className="flex flex-col items-center p-6 lg:p-12 sm:!p-4 max-w-5xl mx-auto gap-y-6 sm:gap-y-4">
            <h1 className="main-heading">{t('ProfileSettingsPage.title')}</h1>

            <section className="w-full">
                <EditProfileForm />
            </section>

            {(!userProfile?.verified ||
                userProfile?.verificationMethod === 'phone') && (
                <section className="plate w-full">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('ProfileSettingsPage.resendEmailTitle')}
                    </h2>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('ProfileSettingsPage.resendEmailDescription')}
                    </p>

                    <Button disabled={isCooldown} onClick={handleResendEmail}>
                        {isCooldown
                            ? `${t('ProfileSettingsPage.resendEmailButton')} (${cooldownTime}s)`
                            : t('ProfileSettingsPage.resendEmailButton')}
                    </Button>
                </section>
            )}

            {shouldShowVerificationPhoneNumber && (
                <section className="plate w-full">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('ProfileSettingsPage.verifiyPhoneNumberTitle')}
                    </h2>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('ProfileSettingsPage.verifiyPhoneNumberDescription')}
                    </p>

                    <Button onClick={handleVerifyPhoneNumber}>
                        {t('ProfileSettingsPage.verificationPhoneNumberButton')}
                    </Button>
                </section>
            )}

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.changeLanguageTitle')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.changeLanguageDescription')}
                </p>

                <Select
                    options={options}
                    placeholder={t('ProfileSettingsPage.changeLanguageButton')}
                    searchable={true}
                    onSelect={handleSelect}
                />
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

            {verificationMethod('phone') && (
                <section className="plate w-full">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('ProfileSettingsPage.changeEmail')}
                    </h2>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('ProfileSettingsPage.changeEmailDescription')}
                    </p>
                    <Button
                        onClick={() => handleOpenModal(ModalsEnum.ChangeEmail)}
                        variant="secondary"
                    >
                        {t('ProfileSettingsPage.changeEmailButton')}
                    </Button>
                </section>
            )}

            {userProfile?.phoneNumber && (
                <section className="plate w-full">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        {t('ProfileSettingsPage.changePhoneNumber')}
                    </h2>
                    <p className="text-sm text-neutral-dark mb-4">
                        {t('ProfileSettingsPage.changePhoneNumberDescription')}
                    </p>
                    <Button
                        onClick={() =>
                            handleOpenModal(ModalsEnum.ChangePhoneNumber)
                        }
                        variant="secondary"
                    >
                        {t('ProfileSettingsPage.changePhoneNumberButton')}
                    </Button>
                </section>
            )}

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
                    {t('ProfileSettingsPage.rules')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.rulesDescription')}
                </p>
                <Button
                    onClick={() => handleOpenModal(ModalsEnum.RulesAndPrivacy)}
                    variant="accent"
                >
                    {t('ProfileSettingsPage.rulesButton')}
                </Button>
            </section>

            <section className="plate w-full">
                <h2 className="text-xl font-semibold text-primary mb-4">
                    {t('ProfileSettingsPage.logOut')}
                </h2>
                <p className="text-sm text-neutral-dark mb-4">
                    {t('ProfileSettingsPage.logOutDescription')}
                </p>
                <Button onClick={signOutUser}>
                    {t('ProfileSettingsPage.logOutButton')}
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

            <ProfileSettingsModals />
        </div>
    );
};

export default ProfileSettingsPage;
