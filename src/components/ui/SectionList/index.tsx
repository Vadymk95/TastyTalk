import { FC } from 'react';

import { SectionItem } from '@root/components/ui/SectionItem';
import { Recipe } from '@root/types';

interface IProps {
    list: Recipe[];
}

export const SectionList: FC<IProps> = ({ list }) => {
    return (
        <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
            {list.map((item) => (
                <SectionItem key={item.id} item={item} />
            ))}
        </ul>
    );
};
