import { FC } from 'react';

interface IProps {
    item: any;
}

export const SectionItem: FC<IProps> = ({ item }) => {
    return (
        <li>
            <h2>{item}</h2>
        </li>
    );
};
