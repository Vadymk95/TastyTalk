import { FC } from 'react';

import { FilterBlock, Grid } from '@root/components/common';

export const MyRecipes: FC = () => {
    return (
        <section>
            <FilterBlock />
            <Grid />
        </section>
    );
};
