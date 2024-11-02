import { Navigation } from '@root/components';
import { FC } from 'react';

export const Header: FC = () => {
    return (
        <header className="header flex justify-between">
            <div>Logo</div>
            <Navigation />
        </header>
    );
};
