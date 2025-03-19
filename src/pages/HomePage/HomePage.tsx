import { FC } from 'react';

import {
    AIRecipesSection,
    MainFilterBlock,
    TopWeekSection,
    WelcomeSection
} from '@root/components/common';

export const HomePage: FC = () => {
    return (
        <>
            <WelcomeSection />

            <div className="plate">
                <MainFilterBlock />

                <div className="flex flex-col gap-4 mt-4">
                    <TopWeekSection />

                    <AIRecipesSection />
                </div>
            </div>
        </>
    );
};
