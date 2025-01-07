import { FC } from 'react';

import {
    ChangeEmailModal,
    ChangePasswordModal,
    ChangePhoneNumberModal,
    DeleteAccountModal,
    PricingModal,
    RulesAndPrivacyModal,
    SupportModal
} from '@root/components/modals';

export const ProfileSettingsModals: FC = () => {
    return (
        <>
            <SupportModal />
            <ChangePasswordModal />
            <ChangeEmailModal />
            <ChangePhoneNumberModal />
            <DeleteAccountModal />
            <PricingModal />
            <RulesAndPrivacyModal />
        </>
    );
};
