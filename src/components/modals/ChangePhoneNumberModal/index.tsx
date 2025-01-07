import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

export const ChangePhoneNumberModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isChangePhoneNumberModalOpen = isModalOpen.changePhoneNumber;

    const handleCloseChangePhoneNumberModal = () =>
        closeModal(ModalsEnum.ChangePhoneNumber);

    return (
        <Modal
            isOpen={isChangePhoneNumberModalOpen}
            onClose={handleCloseChangePhoneNumberModal}
            title={t('Modals.ChangePhoneNumberModal.title')}
        ></Modal>
    );
};
