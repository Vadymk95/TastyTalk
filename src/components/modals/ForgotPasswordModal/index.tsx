import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ForgotPasswordForm } from '@root/components/forms/ForgotPasswordForm';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

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
            titleCenter
            onClose={handleCloseForgotPasswordModal}
        >
            <p className="label text-center mb-5">
                {t('Modals.ForgotPasswordModal.description')}
            </p>

            <ForgotPasswordForm onClose={handleCloseForgotPasswordModal} />
        </Modal>
    );
};
