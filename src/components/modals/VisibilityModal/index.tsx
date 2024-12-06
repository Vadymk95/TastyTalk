import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const VisibilityModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isVisibilityModalOpen = isModalOpen.visibility;

    const handleCloseRulesModal = () => closeModal(ModalsEnum.Visibility);

    return (
        <Modal
            isOpen={isVisibilityModalOpen}
            onClose={handleCloseRulesModal}
            title={t('Modals.VisibilityModal.title')}
        ></Modal>
    );
};
