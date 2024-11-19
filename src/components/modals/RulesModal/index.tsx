import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const RulesModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRulesModalOpen = isModalOpen.rules;

    const handleCloseRulesModal = () => closeModal('rules');

    return (
        <Modal
            isOpen={isRulesModalOpen}
            onClose={handleCloseRulesModal}
            title={t('Modals.RulesModal.title')}
        ></Modal>
    );
};
