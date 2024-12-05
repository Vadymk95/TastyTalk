import { FC, HTMLAttributes } from 'react';

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
    isSelected?: boolean;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'small' | 'medium' | 'large';
    className?: string;
    fullwidth?: boolean;
}

export const Tab: FC<TabProps> = ({
    isSelected = false,
    variant = 'primary',
    size = 'medium',
    className = '',
    fullwidth = false,
    children,
    ...props
}) => {
    const selectedStyle = isSelected ? 'tab-selected' : 'tab-unselected';

    const sizeStyle = {
        small: 'tab-small',
        medium: 'tab-medium',
        large: 'tab-large'
    };

    const fullwidthStyle = fullwidth ? 'w-full flex-1' : 'w-[180px]';

    return (
        <button
            className={`tab-${variant} ${selectedStyle} ${sizeStyle[size]} tab ${fullwidthStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
