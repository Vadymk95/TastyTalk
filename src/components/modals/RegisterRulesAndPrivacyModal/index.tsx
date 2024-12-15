import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RulesAndPrivacy } from '@root/components/common';
import { Checkbox, Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

interface RegisterRulesAndPrivacyModalProps {
    loading: boolean;
}

export const RegisterRulesAndPrivacyModal: FC<
    RegisterRulesAndPrivacyModalProps
> = ({ loading }) => {
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);
    const { isModalOpen, closeModal } = useModalStore();
    const isRegisterRulesAndPrivacyOpen = isModalOpen.registerRulesAndPrivacy;
    const disabled = loading || !checked;

    const handleCloseRegisterRulesAndPrivacy = () =>
        closeModal(ModalsEnum.RegisterRulesAndPrivacy);

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
        </Modal>
    );
};
