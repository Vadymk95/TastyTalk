import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const StepperWelcomeModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isStepperWelcomeModalOpen = isModalOpen.stepperWelcome;

    const handleCloseStepperWelcomeModal = () =>
        closeModal(ModalsEnum.StepperWelcome);

    return (
        <Modal
            isOpen={isStepperWelcomeModalOpen}
            onClose={handleCloseStepperWelcomeModal}
            title={t('Modals.StepperWelcomeModal.title')}
        ></Modal>
    );
};
