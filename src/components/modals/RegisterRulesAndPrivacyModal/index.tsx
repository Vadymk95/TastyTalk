import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RulesAndPrivacy } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const RegisterRulesAndPrivacyModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRegisterRulesAndPrivacyOpen = isModalOpen.registerRulesAndPrivacy;

    const handleCloseRegisterRulesAndPrivacy = () =>
        closeModal(ModalsEnum.RegisterRulesAndPrivacy);

    return (
        <Modal
            isOpen={isRegisterRulesAndPrivacyOpen}
            onClose={handleCloseRegisterRulesAndPrivacy}
            cancelText={t('General.ok')}
            title={t('Modals.RegisterRulesAndPrivacyModal.title')}
        >
            <RulesAndPrivacy />
        </Modal>
    );
};
