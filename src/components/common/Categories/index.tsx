import { FC } from 'react';

import { Badge } from '@root/components/ui';
import { ECategory } from '@root/types';
import { useCategories } from '@root/hooks';

interface CategoriesProps {
    list: string[];
    className?: string;
}

const getCategoryColor = (group: string): string => {
    const colorClasses: Record<string, string> = {
        DishType: ECategory.DISH_TYPE,
        WorldCuisine: ECategory.WORLD_CUISINE,
        DietaryPreference: ECategory.DIETARY_PREFERENCE,
        CookingFeatures: ECategory.COOKING_FEATURES,
        Spiciness: ECategory.SPICINESS
    };

    return colorClasses[group] || 'category-default';
};

export const Categories: FC<CategoriesProps> = ({ list, className }) => {
    const categories = useCategories();

    return (
        <ul className={`inline-flex gap-2 items-center flex-wrap ${className}`}>
            {list.map((categoryId, index) => {
                const category = categories.find(
                    (cat) => cat.id === categoryId
                );

                if (!category) return null;

                const { name, group } = category;

                const categoryColor = getCategoryColor(group);

                return (
                    <li key={index}>
                        <Badge categoryColor={categoryColor} text={name} />
                    </li>
                );
            })}
        </ul>
    );
};
