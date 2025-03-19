import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Recipe } from '@root/components/common/Recipe';
import { Modal } from '@root/components/ui/Modal';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store/modalStore';
import { Recipe as RecipeType } from '@root/types';

type RecipePreviewModalProps = {
    recipe: RecipeType;
    modalKey?: string;
};

export const RecipePreviewModal: FC<RecipePreviewModalProps> = ({
    recipe,
    modalKey
}) => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRecipePreviewModalOpen = modalKey
        ? isModalOpen[modalKey]
        : isModalOpen.recipePreview;

    const handleCloseRecipePreviewModal = () =>
        closeModal(modalKey ? modalKey : ModalsEnum.RecipePreview);

    return (
        <Modal
            isOpen={isRecipePreviewModalOpen}
            onClose={handleCloseRecipePreviewModal}
            title={t('Modals.RecipePreviewModal.title')}
            variant="secondary"
            cancelText={t('General.close')}
        >
            <Recipe recipe={recipe} />
        </Modal>
    );
};
