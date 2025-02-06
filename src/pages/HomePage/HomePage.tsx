import { FC } from 'react';

import { MainFilterBlock, TopWeekSection } from '@root/components/common';

export const HomePage: FC = () => {
    return (
        <div className="plate">
            <MainFilterBlock />

            <div className="flex flex-col gap-4 mt-4">
                <TopWeekSection />

                <TopWeekSection />

                <TopWeekSection />
            </div>
        </div>
    );
};
