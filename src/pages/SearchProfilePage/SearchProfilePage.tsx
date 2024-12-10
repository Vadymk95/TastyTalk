import { FC } from 'react';

import { SearchInput } from '@root/components/ui';

const SearchProfilePage: FC = () => {
    return (
        <section className="h-100">
            <h1 className="main-heading">asd</h1>

            <div className="plate h-100">
                <SearchInput name="search-profiles" />
            </div>
        </section>
    );
};

export default SearchProfilePage;
