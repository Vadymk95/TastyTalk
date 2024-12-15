import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RulesAndPrivacy } from '@root/components/common';
import { Checkbox, ErrorCard, Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useAuthStore, useModalStore } from '@root/store';

interface RegisterRulesAndPrivacyModalProps {
    loading: boolean;
    modalError: {
        hasError: boolean;
        errorMessage: string;
    };
}

export const RegisterRulesAndPrivacyModal: FC<
    RegisterRulesAndPrivacyModalProps
> = ({ loading, modalError }) => {
    const { t } = useTranslation();
    const { clearError } = useAuthStore();
    const [checked, setChecked] = useState(false);
    const { isModalOpen, closeModal } = useModalStore();
    const isRegisterRulesAndPrivacyOpen = isModalOpen.registerRulesAndPrivacy;
    const disabled = loading || !checked;

    const handleCloseRegisterRulesAndPrivacy = () => {
        clearError();
        closeModal(ModalsEnum.RegisterRulesAndPrivacy);
    };

    return (
        <Modal
            isOpen={isRegisterRulesAndPrivacyOpen}
            onClose={handleCloseRegisterRulesAndPrivacy}
            confirmText={t('Forms.RegisterForm.signUp')}
            disabled={disabled}
            submitType="submit"
            title={t('Modals.RegisterRulesAndPrivacyModal.title')}
        >
            <RulesAndPrivacy />
            <Checkbox
                className="mt-6"
                name="rulesAndPrivacy"
                label={t('Modals.RegisterRulesAndPrivacyModal.check')}
                checked={checked}
                onChange={setChecked}
            />

            {modalError.hasError && (
                <div className="my-6 duration-300">
                    <ErrorCard errorMessage={modalError.errorMessage} />
                </div>
            )}
        </Modal>
    );
};
