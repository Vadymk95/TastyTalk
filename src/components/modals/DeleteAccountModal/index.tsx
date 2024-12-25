import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteAccountForm } from '@root/components/forms/DeleteAccountForm';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

export const DeleteAccountModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isDeleteAccountModalOpen = isModalOpen.deleteAccount;

    const handleCloseDeleteAccountModal = () =>
        closeModal(ModalsEnum.DeleteAccount);

    return (
        <Modal
            isOpen={isDeleteAccountModalOpen}
            onClose={handleCloseDeleteAccountModal}
            title={t('Modals.DeleteAccountModal.title')}
        >
            <DeleteAccountForm
                handleCloseModal={handleCloseDeleteAccountModal}
            />
        </Modal>
    );
};
