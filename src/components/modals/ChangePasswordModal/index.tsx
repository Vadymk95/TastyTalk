import { FC } from 'react';

import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const ChangePasswordModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isChangePasswordModalOpen = isModalOpen.changePassword;

    const handleCloseChangePasswordModal = () => closeModal('changePassword');

    return (
        <Modal
            isOpen={isChangePasswordModalOpen}
            onClose={handleCloseChangePasswordModal}
            title="Change Password Modal"
        >
            <p>Content for the Change Password modal</p>
        </Modal>
    );
};
