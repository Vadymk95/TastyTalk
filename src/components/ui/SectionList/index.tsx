import { FC } from 'react';

import { SectionRecipeItem } from '@root/components/ui/SectionRecipeItem';
import { Recipe } from '@root/types';

interface IProps {
    list: Recipe[];
}

export const SectionList: FC<IProps> = ({ list }) => {
    return (
        <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
            {list.map((item) => (
                <SectionRecipeItem key={item.id} recipe={item} />
            ))}
        </ul>
    );
};
