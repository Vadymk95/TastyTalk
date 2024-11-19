import { FC } from 'react';

import {
    ChangePasswordModal,
    DeleteAccountModal,
    PricingModal,
    SupportModal,
    RulesModal
} from '@root/components/modals';

export const ProfileSettingsModals: FC = () => {
    return (
        <>
            <SupportModal />
            <ChangePasswordModal />
            <DeleteAccountModal />
            <PricingModal />
            <RulesModal />
        </>
    );
};
