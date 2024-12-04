import { FC, useEffect } from 'react';

import './index.css';

interface LoaderProps {
    fullscreen?: boolean;
}

export const Loader: FC<LoaderProps> = ({ fullscreen = false }) => {
    useEffect(() => {
        if (fullscreen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (fullscreen) {
                document.body.style.overflow = '';
            }
        };
    }, [fullscreen]);

    return (
        <div className={`loader-container${fullscreen ? '--fullscreen' : ''}`}>
            <div className="loader">
                <div className="loader-circle"></div>
            </div>
        </div>
    );
};
