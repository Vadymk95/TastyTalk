import { FilterBlock, Grid } from '@root/components/common';
import { FC } from 'react';

export const MyMealPlans: FC = () => {
    return (
        <section>
            <h1>My Meal Plans</h1>

            <FilterBlock />
            <Grid />
        </section>
    );
};
