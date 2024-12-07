import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Modal, Tooltip } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

interface VisibilityModalProps {
    handleSave?: () => void;
    type: 'recipe' | 'mealPlan';
}

export const VisibilityModal: FC<VisibilityModalProps> = ({
    handleSave,
    type = 'recipe'
}) => {
    const { t } = useTranslation();
    const [visibility, setVisibility] = useState<string>('everyone');
    const { isModalOpen, closeModal } = useModalStore();
    const isVisibilityModalOpen = isModalOpen.visibility;

    const handleCloseRulesModal = () => closeModal(ModalsEnum.Visibility);

    const handleVisibilityChange = (value: string) => {
        setVisibility(value);
    };

    return (
        <Modal
            isOpen={isVisibilityModalOpen}
            onClose={handleCloseRulesModal}
            title={t(`Modals.VisibilityModal.${type}Title`)}
        >
            <div className="flex flex-col my-8 gap-8">
                <div>
                    <Tooltip text="text1">
                        <Checkbox
                            name="everyone"
                            size="medium"
                            label={t('Modals.VisibilityModal.everyone')}
                            checked={visibility === 'everyone'}
                            onChange={() => handleVisibilityChange('everyone')}
                        />
                    </Tooltip>
                </div>

                <div>
                    <Tooltip text="text2">
                        <Checkbox
                            name="noone"
                            size="medium"
                            label={t('Modals.VisibilityModal.noone')}
                            checked={visibility === 'noone'}
                            onChange={() => handleVisibilityChange('noone')}
                        />
                    </Tooltip>
                </div>

                <div>
                    <Tooltip text="text3">
                        <div></div>
                    </Tooltip>
                </div>
            </div>

            <div className="flex gap-4 justify-end">
                <Button onClick={handleCloseRulesModal}>
                    {t('General.cancel')}
                </Button>
                {handleSave ? (
                    <Button variant="secondary" onClick={handleSave}>
                        {t('General.confirm')}
                    </Button>
                ) : (
                    <Button variant="secondary" type="submit">
                        {t('General.confirm')}
                    </Button>
                )}
            </div>
        </Modal>
    );
};
