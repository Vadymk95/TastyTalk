import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Rules } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const RulesModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRulesModalOpen = isModalOpen.rules;

    const handleCloseRulesModal = () => closeModal(ModalsEnum.Rules);

    return (
        <Modal
            isOpen={isRulesModalOpen}
            onClose={handleCloseRulesModal}
            cancelText={t('General.ok')}
            title={t('Modals.RulesModal.title')}
        >
            <Rules />
        </Modal>
    );
};
