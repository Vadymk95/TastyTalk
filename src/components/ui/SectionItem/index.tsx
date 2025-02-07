import { FC, useEffect } from 'react';

import { DifficultyMap } from '@root/components/common/DifficultyMap';
import { RecipePreviewModal } from '@root/components/modals/RecipePreviewModal';
import { Badge } from '@root/components/ui/Badge';
import { ModalsEnum } from '@root/constants/modals';
import { getCategoryColor } from '@root/helpers/getCategoryColor';
import { useModalStore } from '@root/store/modalStore';
import { Recipe } from '@root/types';

interface IProps {
    item: Recipe;
}

export const SectionItem: FC<IProps> = ({ item }) => {
    const { openModal, closeModal } = useModalStore();
    const handlePreview = () => openModal(ModalsEnum.RecipePreview);

    useEffect(() => {
        return () => closeModal(ModalsEnum.RecipePreview);
    }, [closeModal]);

    return (
        <>
            <li
                onClick={handlePreview}
                className="rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-300 cursor-pointer max-w-[250px]"
            >
                <div className="w-full h-[150px] bg-secondary rounded-md"></div>
                <div className="flex flex-col mt-2 gap-2">
                    <h2 className="font-heading text-primary text-sm">
                        {item.title}
                    </h2>

                    {item.difficulty && (
                        <DifficultyMap
                            className="text-xs"
                            level={item.difficulty}
                        />
                    )}
                </div>
                <div className="flex gap-2 mt-2">
                    {item.categories &&
                        item.categories.map((category) => {
                            const { name, group } = category;
                            const categoryColor = getCategoryColor(group);
                            return (
                                <Badge
                                    categoryColor={categoryColor}
                                    text={name}
                                />
                            );
                        })}
                </div>
            </li>

            <RecipePreviewModal recipe={item} />
        </>
    );
};
