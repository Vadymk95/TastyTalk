import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RulesAndPrivacy } from '@root/components/common/RulesAndPrivacy';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

export const RulesAndPrivacyModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRulesAndPrivacyModalOpen = isModalOpen.rulesAndPrivacy;

    const handleCloseRulesAndPrivacyModal = () =>
        closeModal(ModalsEnum.RulesAndPrivacy);

    return (
        <Modal
            isOpen={isRulesAndPrivacyModalOpen}
            onClose={handleCloseRulesAndPrivacyModal}
            cancelText={t('General.ok')}
            title={t('Modals.RulesAndPrivacyModal.title')}
        >
            <RulesAndPrivacy />
        </Modal>
    );
};
