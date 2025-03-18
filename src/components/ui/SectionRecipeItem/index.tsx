import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DifficultyMap } from '@root/components/common/DifficultyMap';
import { RecipePreviewModal } from '@root/components/modals/RecipePreviewModal';
import { Badge, Image } from '@root/components/ui';
import { ModalsEnum } from '@root/constants/modals';
import { getCategoryColor } from '@root/helpers/getCategoryColor';
import { useModalStore } from '@root/store/modalStore';
import { Recipe } from '@root/types';

import noRecipeImage from '@root/assets/images/no-recipe.webp';

interface IProps {
    recipe: Recipe;
}

export const SectionRecipeItem: FC<IProps> = ({ recipe }) => {
    const { t } = useTranslation();
    const { openModal, closeModal } = useModalStore();
    const modalKey = `${ModalsEnum.RecipePreview}-${recipe.id}`;
    const handlePreview = () => openModal(modalKey);

    useEffect(() => {
        return () => closeModal(modalKey);
    }, [closeModal, modalKey]);

    return (
        <>
            <li
                onClick={handlePreview}
                className="rounded-xl border p-2 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
            >
                <div className="w-full bg-secondary rounded-md overflow-hidden">
                    <Image
                        src={noRecipeImage}
                        alt={t('Alts.noRecipeImage')}
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <h2 className="font-heading text-primary text-sm">
                        {recipe.title}
                    </h2>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs font-heading text-secondary">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            <p>
                                &#126;{recipe.cookingTime}{' '}
                                {t('General.minutes')}
                            </p>
                        </div>

                        {recipe.difficulty && (
                            <DifficultyMap
                                className="text-xs"
                                level={recipe.difficulty}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.categories &&
                        recipe.categories.map((category) => {
                            const { name, group } = category;
                            const categoryColor = getCategoryColor(group);
                            return (
                                <Badge
                                    categoryColor={categoryColor}
                                    text={name}
                                    className="text-xs"
                                />
                            );
                        })}
                </div>
            </li>

            <RecipePreviewModal recipe={recipe} modalKey={modalKey} />
        </>
    );
};
