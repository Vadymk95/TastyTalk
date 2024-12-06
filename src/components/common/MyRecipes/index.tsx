import { FC } from 'react';

import { FilterBlock, Grid } from '@root/components/common';

export const MyRecipes: FC = () => {
    return (
        <section>
            <h1>My Recipes</h1>

            <FilterBlock />
            <Grid />
        </section>
    );
};
