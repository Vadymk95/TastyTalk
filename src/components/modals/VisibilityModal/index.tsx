import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Button,
    Checkbox,
    Modal,
    MultiSelectWithSearchAndCheckboxes,
    Tooltip
} from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type VisibilityType = 'everyone' | 'noone' | 'selected';

interface VisibilityModalProps {
    handleSave?: () => void;
    type: 'recipe' | 'mealPlan';
}

const options = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'Michael Johnson' },
    { value: '4', label: 'Emily Davis' },
    { value: '5', label: 'David Brown' },
    { value: '6', label: 'Anna WhiteCooperExpre' }
];

export const VisibilityModal: FC<VisibilityModalProps> = ({
    handleSave,
    type = 'recipe'
}) => {
    const { t } = useTranslation();
    const [visibility, setVisibility] = useState<VisibilityType>('everyone');
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const { isModalOpen, closeModal } = useModalStore();
    const isVisibilityModalOpen = isModalOpen.visibility;

    const handleCloseRulesAndPrivacyModal = () =>
        closeModal(ModalsEnum.Visibility);

    const handleVisibilityChange = (value: VisibilityType) => {
        setVisibility(value);
    };

    const handleSelectionChange = (selected: string[]) => {
        console.log('Выбранные пользователи:', selected);
        setSelectedFriends(selected);

        if (selected.length > 0) {
            setVisibility('selected');
        } else {
            setVisibility('everyone');
        }
    };

    const handleChange = (value: VisibilityType) => {
        if (value !== 'selected') setSelectedFriends([]);
        handleVisibilityChange(value);
    };

    const onSearch = (query: string) => {
        console.log('Поиск:', query);
    };

    return (
        <Modal
            isOpen={isVisibilityModalOpen}
            onClose={handleCloseRulesAndPrivacyModal}
            title={t(`Modals.VisibilityModal.${type}Title`)}
            classNameMotion="!overflow-visible"
        >
            <div className="flex flex-col my-8 gap-8">
                <div className="flex items-center gap-2">
                    <Checkbox
                        name="everyone"
                        size="medium"
                        label={t('Modals.VisibilityModal.everyone')}
                        checked={visibility === 'everyone'}
                        onChange={() => handleChange('everyone')}
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
                        onChange={() => handleChange('noone')}
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
                    <MultiSelectWithSearchAndCheckboxes
                        options={options}
                        placeholder={t('Modals.VisibilityModal.selectFriends')}
                        selectedValues={selectedFriends}
                        searchable={true}
                        onChange={handleSelectionChange}
                        onSearch={onSearch}
                    />

                    <Tooltip
                        position="top"
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
                <Button onClick={handleCloseRulesAndPrivacyModal}>
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
