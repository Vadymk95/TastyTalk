import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ChangePasswordForm } from '@root/components/forms';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const ChangePasswordModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isChangePasswordModalOpen = isModalOpen.changePassword;

    const handleCloseChangePasswordModal = () =>
        closeModal(ModalsEnum.ChangePassword);

    return (
        <Modal
            isOpen={isChangePasswordModalOpen}
            onClose={handleCloseChangePasswordModal}
            title={t('Modals.ChangePasswordModal.title')}
        >
            <ChangePasswordForm
                handleCloseModal={handleCloseChangePasswordModal}
            />
        </Modal>
    );
};
