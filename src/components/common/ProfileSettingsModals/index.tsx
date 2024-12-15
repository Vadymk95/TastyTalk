import { FC } from 'react';

import {
    ChangePasswordModal,
    DeleteAccountModal,
    PricingModal,
    SupportModal,
    RulesAndPrivacyModal
} from '@root/components/modals';

export const ProfileSettingsModals: FC = () => {
    return (
        <>
            <SupportModal />
            <ChangePasswordModal />
            <DeleteAccountModal />
            <PricingModal />
            <RulesAndPrivacyModal />
        </>
    );
};
