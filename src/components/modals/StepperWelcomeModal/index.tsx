import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Modal } from '@root/components/ui';
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
            cancelText={t('General.close')}
        >
            <div className="space-y-4 max-w-[600px]">
                <p>{t('Modals.StepperWelcomeModal.description')}</p>

                <div>
                    <h4 className="text-lg font-medium text-secondary mb-1">
                        {t('Modals.StepperWelcomeModal.stepsTitle')}
                    </h4>
                    <ul className="list-disc pl-6 flex flex-col gap-2">
                        <li>{t('Stepper.Steps.Recipe.1.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.2.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.3.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.4.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.5.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.6.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.7.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.8.description')}</li>
                        <li>{t('Stepper.Steps.Recipe.9.description')}</li>
                    </ul>
                </div>

                <Checkbox
                    name="doNotShowAgain"
                    label={t('Modals.StepperWelcomeModal.doNotShowAgain')}
                />
            </div>
        </Modal>
    );
};
