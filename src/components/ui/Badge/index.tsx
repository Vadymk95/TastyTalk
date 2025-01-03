import { FC } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BadgeProps {
    text: string;
    categoryColor: string;
    withDelete?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Badge: FC<BadgeProps> = ({
    text,
    categoryColor,
    withDelete,
    className = '',
    onClick
}) => {
    return (
        <p onClick={onClick} className={`badge ${categoryColor} ${className}`}>
            <span>{text}</span>
            {withDelete && (
                <FontAwesomeIcon
                    className="hover:text-primary active:text-primary-dark active:scale-95 cursor-pointer hover:scale-125"
                    icon={faXmark}
                />
            )}
        </p>
    );
};
