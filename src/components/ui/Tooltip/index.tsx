import { FC, ReactNode, useState } from 'react';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TooltipProps {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children: ReactNode;
    className?: string;
    shouldShow?: boolean;
    withIcon?: boolean;
}

export const Tooltip: FC<TooltipProps> = ({
    text,
    position = 'top',
    children,
    className = '',
    shouldShow = true,
    withIcon = true
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (visible: boolean) => {
        setIsVisible(visible);
    };

    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2',
        bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 rotate-180',
        left: 'right-[-9px] top-1/2 transform -translate-y-1/2 -rotate-90',
        right: 'left-[-9px] top-1/2 transform -translate-y-1/2 rotate-90'
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => toggleVisibility(true)}
            onMouseLeave={() => toggleVisibility(false)}
        >
            {children}

            {isVisible && shouldShow && (
                <div
                    className={`tooltip ${positionClasses[position]} ${className}`}
                >
                    {withIcon && (
                        <FontAwesomeIcon
                            className="mr-2 text-secondary-light"
                            size="xl"
                            icon={faCircleInfo}
                        />
                    )}
                    <span>{text}</span>

                    <div
                        className={`tooltip-pointer ${arrowClasses[position]}`}
                    />
                </div>
            )}
        </div>
    );
};
