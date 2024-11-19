import { FC } from 'react';

import { Pricing } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';
import { ModalsEnum } from '@root/constants/modals';

export const PricingModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isPricingModalOpen = isModalOpen.pricing;

    const handleClosePricingModal = () => closeModal(ModalsEnum.Pricing);

    return (
        <Modal isOpen={isPricingModalOpen} onClose={handleClosePricingModal}>
            <Pricing />
        </Modal>
    );
};
