import { FC, HTMLAttributes } from 'react';

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
    isSelected?: boolean;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Tab: FC<TabProps> = ({
    isSelected = false,
    variant = 'primary',
    size = 'medium',
    className,
    children,
    ...props
}) => {
    const selectedStyle = isSelected ? 'tab-selected' : 'tab-unselected';

    const sizeStyle = {
        small: 'tab-small',
        medium: 'tab-medium',
        large: 'tab-large'
    };

    return (
        <button
            className={`tab-${variant} ${selectedStyle} ${sizeStyle[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
