import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Recipe } from '@root/components/common';
import { Modal } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { useModalStore } from '@root/store';

type RecipePreviewModalProps = {
    recipe: any;
};

export const RecipePreviewModal: FC<RecipePreviewModalProps> = ({ recipe }) => {
    const { t } = useTranslation();
    const { isModalOpen, closeModal } = useModalStore();
    const isRecipePreviewModalOpen = isModalOpen.recipePreview;

    const handleCloseRecipePreviewModal = () =>
        closeModal(ModalsEnum.RecipePreview);

    return (
        <Modal
            isOpen={isRecipePreviewModalOpen}
            onClose={handleCloseRecipePreviewModal}
            title={t('Modals.RecipePreviewModal.title')}
            variant="secondary"
            cancelText="Закрыть"
        >
            <Recipe recipe={recipe} />
        </Modal>
    );
};
