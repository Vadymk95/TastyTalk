import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Pricing } from '@root/components/common/Pricing';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

export const PricingModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isPricingModalOpen = isModalOpen.pricing;
    const handleClosePricingModal = () => closeModal(ModalsEnum.Pricing);

    return (
        <Modal
            cancelText={t('General.cancel')}
            isOpen={isPricingModalOpen}
            onClose={handleClosePricingModal}
            title={t('Pricing.title')}
        >
            <Pricing />
        </Modal>
    );
};
