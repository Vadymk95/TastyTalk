import { FC } from 'react';

import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const DeleteAccountModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isDeleteAccountModalOpen = isModalOpen.deleteAccount;

    const handleCloseDeleteAccountModal = () => closeModal('deleteAccount');

    return (
        <Modal
            isOpen={isDeleteAccountModalOpen}
            onClose={handleCloseDeleteAccountModal}
            title="Delete Account Modal"
        >
            <p>Content for the Delete Account modal</p>
        </Modal>
    );
};
