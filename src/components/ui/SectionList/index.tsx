import { FC } from 'react';

import { SectionItem } from '@root/components/ui/SectionItem';

interface IProps {
    list: any[];
}

export const SectionList: FC<IProps> = ({ list }) => {
    return (
        <ul className="flex gap-2">
            {list.map((item, index) => (
                <SectionItem key={index} item={item} />
            ))}
        </ul>
    );
};
