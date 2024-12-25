import { FC } from 'react';

import { Badge } from '@root/components/ui/Badge';
import { getCategoryColor } from '@root/helpers/getCategoryColor';
import { useCategories } from '@root/hooks/useCategories';
import { Category } from '@root/types';

interface CategoriesProps {
    list: Category[] | null;
    className?: string;
}

export const Categories: FC<CategoriesProps> = ({ list, className }) => {
    const categories = useCategories();

    return (
        <ul className={`inline-flex gap-2 items-center flex-wrap ${className}`}>
            {!!list &&
                list.map(({ id }, index) => {
                    const category = categories.find((cat) => cat.id === id);

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
