import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteAccountForm } from '@root/components/forms';
import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const DeleteAccountModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isDeleteAccountModalOpen = isModalOpen.deleteAccount;

    const handleCloseDeleteAccountModal = () => closeModal('deleteAccount');

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
