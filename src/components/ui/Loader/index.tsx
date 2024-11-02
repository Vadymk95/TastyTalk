import { FC } from 'react';
import './index.css';

export const Loader: FC = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="loader-circle"></div>
            </div>
        </div>
    );
};
