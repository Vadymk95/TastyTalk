import { FC } from 'react';

import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SuccessCardProps = {
    successMessage: string | null;
    className?: string;
};

export const SuccessCard: FC<SuccessCardProps> = ({
    successMessage = '',
    className
}) => {
    return (
        <div className={`card card-success ${className}`}>
            <FontAwesomeIcon className="mr-3" icon={faSquareCheck} size="xl" />

            <span>{successMessage}</span>
        </div>
    );
};
