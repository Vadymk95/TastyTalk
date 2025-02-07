import { FC } from 'react';

import { SectionItem } from '@root/components/ui/SectionItem';
import { Recipe } from '@root/types';

interface IProps {
    list: Recipe[];
}

export const SectionList: FC<IProps> = ({ list }) => {
    return (
        <ul className="flex gap-3">
            {list.map((item, index) => (
                <SectionItem key={index} item={item} />
            ))}
        </ul>
    );
};
