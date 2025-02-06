import { FC } from 'react';

import { SectionList } from '@root/components/ui/SectionList';

interface IProps {
    title: string;
    list: any[];
    onShowMore: () => void;
    onHide: () => void;
}

export const Section: FC<IProps> = ({ title, list, onShowMore, onHide }) => {
    return (
        <section className="w-full">
            <div className="flex justify-between align-center">
                <h2>{title}</h2>
                <button onClick={onShowMore}>Show more</button>
            </div>

            <SectionList list={list} />

            <div className="flex justify-end">
                <button onClick={onHide}>Hide</button>
            </div>
        </section>
    );
};
