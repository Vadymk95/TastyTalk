import { FC } from 'react';

import { Pricing } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { useModalStore } from '@root/store';

export const PricingModal: FC = () => {
    const { isModalOpen, closeModal } = useModalStore();
    const isPricingModalOpen = isModalOpen.pricing;

    const handleClosePricingModal = () => closeModal('pricing');

    return (
        <Modal isOpen={isPricingModalOpen} onClose={handleClosePricingModal}>
            <Pricing />
        </Modal>
    );
};
