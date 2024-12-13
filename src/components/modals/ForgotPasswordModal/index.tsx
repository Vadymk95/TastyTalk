import { FC } from 'react';

import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const ForgotPasswordModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isForgotPasswordModalOpen = isModalOpen.forgotPassword;

    const handleCloseForgotPasswordModal = () =>
        closeModal(ModalsEnum.ForgotPassword);

    return (
        <Modal
            isOpen={isForgotPasswordModalOpen}
            onClose={handleCloseForgotPasswordModal}
        ></Modal>
    );
};
