import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Modal, Tooltip } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <div className="flex items-center gap-2">
                    <Checkbox
                        name="everyone"
                        size="medium"
                        label={t('Modals.VisibilityModal.everyone')}
                        checked={visibility === 'everyone'}
                        onChange={() => handleVisibilityChange('everyone')}
                    />

                    <Tooltip
                        position="right"
                        text={t(`Modals.VisibilityModal.${type}CheckboxAll`)}
                    >
                        <FontAwesomeIcon
                            className="text-neutral-dark/20"
                            icon={faCircleInfo}
                        />
                    </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        name="noone"
                        size="medium"
                        label={t('Modals.VisibilityModal.noone')}
                        checked={visibility === 'noone'}
                        onChange={() => handleVisibilityChange('noone')}
                    />

                    <Tooltip
                        position="right"
                        text={t(`Modals.VisibilityModal.${type}CheckboxNobody`)}
                    >
                        <FontAwesomeIcon
                            className="text-neutral-dark/20"
                            icon={faCircleInfo}
                        />
                    </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                    <div>select</div>

                    <Tooltip
                        position="right"
                        text={t(
                            `Modals.VisibilityModal.${type}CheckboxSelected`
                        )}
                    >
                        <FontAwesomeIcon
                            className="text-neutral-dark/20"
                            icon={faCircleInfo}
                        />
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
