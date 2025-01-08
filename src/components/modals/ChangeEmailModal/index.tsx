import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EditEmailForm } from '@root/components/forms/EditEmailForm';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

export const ChangeEmailModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isChangeEmailModalOpen = isModalOpen.changeEmail;

    const handleCloseChangeEmailModal = () =>
        closeModal(ModalsEnum.ChangeEmail);

    return (
        <Modal
            isOpen={isChangeEmailModalOpen}
            onClose={handleCloseChangeEmailModal}
            title={t('Modals.ChangeEmailModal.title')}
        >
            <EditEmailForm handleCloseModal={handleCloseChangeEmailModal} />
        </Modal>
    );
};
