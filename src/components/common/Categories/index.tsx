import { categories } from '@root/constants/categories';
import { FC } from 'react';

interface CategoriesProps {
    list: string[];
    className?: string;
}

const getCategoryColor = (group: string): string => {
    if (group === 'DishType') return 'bg-blue-100 text-blue-800';
    if (group === 'WorldCuisine') return 'bg-green-100 text-green-800';
    if (group === 'DietaryPreference') return 'bg-yellow-100 text-yellow-800';
    if (group === 'CookingFeatures') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
};

export const Categories: FC<CategoriesProps> = ({ list, className }) => {
    return (
        <ul className={`inline-flex gap-2 items-center flex-wrap ${className}`}>
            {list.map((categoryId, index) => {
                const category = categories.find(
                    (cat) => cat.id === categoryId
                );

                if (!category) return null;

                const { name, group } = category;

                return (
                    <li
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(group)}`}
                    >
                        {name}
                    </li>
                );
            })}
        </ul>
    );
};
