import { FC } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BadgeProps {
    text: string;
    categoryColor: string;
    className?: string;
    withDelete?: boolean;
}

export const Badge: FC<BadgeProps> = ({
    text,
    categoryColor,
    className,
    withDelete
}) => {
    return (
        <p
            className={`inline-flex gap-1 leading-tight shadow-md items-center px-3 sm:px-2 border sm:text-xs py-1 rounded-full text-sm font-medium ${categoryColor} ${className}`}
        >
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
