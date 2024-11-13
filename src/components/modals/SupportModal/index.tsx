import { FC } from 'react';

import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const SupportModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isSupportModalOpen = isModalOpen.support;

    const handleCloseSupportModal = () => closeModal('support');

    return (
        <Modal
            isOpen={isSupportModalOpen}
            onClose={handleCloseSupportModal}
            title="Support Modal"
        >
            <p>Content for the Support modal</p>
        </Modal>
    );
};
