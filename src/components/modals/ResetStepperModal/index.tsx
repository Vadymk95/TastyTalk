import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

type ResetStepperModalProps = {
    handleReset: () => void;
};

export const ResetStepperModal: FC<ResetStepperModalProps> = ({
    handleReset
}) => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isResetStepperModalOpen = isModalOpen.resetStepper;

    const handleCloseResetStepperModal = () =>
        closeModal(ModalsEnum.ResetStepper);

    const handleResetStepperModal = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        handleReset();
        closeModal(ModalsEnum.ResetStepper);
    };

    return (
        <Modal
            isOpen={isResetStepperModalOpen}
            onClose={handleCloseResetStepperModal}
            title={t('Modals.ResetStepperModal.title')}
        >
            <p className="text-center mb-4">
                {t('Modals.ResetStepperModal.description')}
            </p>
            <div className="flex justify-center gap-6">
                <Button
                    variant="neutral"
                    size="large"
                    onClick={handleCloseResetStepperModal}
                >
                    {t('Modals.ResetStepperModal.cancel')}
                </Button>
                <Button
                    size="large"
                    onClick={(event) => handleResetStepperModal(event)}
                >
                    {t('Modals.ResetStepperModal.reset')}
                </Button>
            </div>
        </Modal>
    );
};
