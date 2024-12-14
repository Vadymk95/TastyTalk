import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

export const RulesModal: FC = () => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRulesModalOpen = isModalOpen.rules;

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

                <p>{t('Modals.RulesModal.rule1')}</p>
                <p>{t('Modals.RulesModal.rule2')}</p>
                <p>{t('Modals.RulesModal.rule3')}</p>
                <p>{t('Modals.RulesModal.rule4')}</p>
                <p>{t('Modals.RulesModal.rule5')}</p>
                <p>{t('Modals.RulesModal.rule6')}</p>
                <p>{t('Modals.RulesModal.rule7')}</p>

                <div className="divider" />
            </div>
        </Modal>
    );
};
