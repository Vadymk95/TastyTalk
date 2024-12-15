import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const RulesModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRulesModalOpen = isModalOpen.rules;
    const RULES = 14;
    const rulesList = Array.from({ length: RULES });

    const handleCloseRulesModal = () => closeModal(ModalsEnum.Rules);

    return (
        <Modal
            isOpen={isRulesModalOpen}
            onClose={handleCloseRulesModal}
            cancelText={t('General.ok')}
            title={t('Modals.RulesModal.title')}
        >
            <div className="space-y-4 text-neutral-dark text-sm">
                <p className="label mb-6">
                    {t('Modals.RulesModal.description')}
                </p>
                <div className="divider" />
                {rulesList.map((_, index) => (
                    <p key={index}>{t(`Modals.RulesModal.rule${index + 1}`)}</p>
                ))}
                <div className="divider" />
            </div>
        </Modal>
    );
};
