import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Rules } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const RegisterRulesModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRegisterRulesOpen = isModalOpen.registerRules;

    const handleCloseRegisterRules = () => closeModal(ModalsEnum.RegisterRules);

    return (
        <Modal
            isOpen={isRegisterRulesOpen}
            onClose={handleCloseRegisterRules}
            cancelText={t('General.ok')}
            title={t('Modals.RegisterRules.title')}
        >
            <Rules />
        </Modal>
    );
};
