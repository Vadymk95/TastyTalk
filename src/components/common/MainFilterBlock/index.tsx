import { FC } from 'react';

import { SearchInput, Select } from '@root/components/ui';

export const MainFilterBlock: FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <SearchInput name={'mainSearch'} />
            <div className="flex items-center gap-2">
                <span>Выбор по:</span>
                <Select
                    options={[]}
                    placeholder="Выберите что-то"
                    onSelect={() => {}}
                />
            </div>
        </div>
    );
};
