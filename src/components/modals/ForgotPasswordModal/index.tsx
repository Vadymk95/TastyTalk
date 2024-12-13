import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ForgotPasswordForm } from '@root/components/forms';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const ForgotPasswordModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isForgotPasswordModalOpen = isModalOpen.forgotPassword;

    const handleCloseForgotPasswordModal = () =>
        closeModal(ModalsEnum.ForgotPassword);

    return (
        <Modal
            isOpen={isForgotPasswordModalOpen}
            title={t('Modals.ForgotPasswordModal.title')}
            onClose={handleCloseForgotPasswordModal}
        >
            <ForgotPasswordForm />
        </Modal>
    );
};
