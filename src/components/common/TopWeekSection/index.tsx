import { FC } from 'react';

import { Section } from '@root/components/ui/Section';

const testList = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export const TopWeekSection: FC = () => {
    const onShowMore = () => {};
    const onHide = () => {};

    return (
        <Section
            title="Топ недели"
            list={testList}
            onShowMore={onShowMore}
            onHide={onHide}
        />
    );
};
