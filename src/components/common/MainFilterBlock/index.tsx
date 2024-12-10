import { FC } from 'react';
import { SearchInput } from '../../ui';

export const MainFilterBlock: FC = () => {
    return (
        <div>
            <SearchInput name={'mainSearch'} />
        </div>
    );
};
