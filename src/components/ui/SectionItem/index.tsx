import { FC } from 'react';

interface IProps {
    item: any;
}

export const SectionItem: FC<IProps> = ({ item }) => {
    return (
        <li className="rounded-xl border p-4 shadow-sm hover:shadow-md transition duration-300 cursor-pointer">
            <div className="w-[150px] h-[150px] bg-secondary rounded-md"></div>
            <h2 className="mt-2">{item}</h2>
        </li>
    );
};
