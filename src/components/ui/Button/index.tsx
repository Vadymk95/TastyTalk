import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'close';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
}

export const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className,
    children,
    ...props
}) => {
    const disabledStyle = disabled ? 'btn-disabled' : '';

    const sizeStyle = {
        small: 'btn-small',
        medium: 'btn-medium',
        large: 'btn-large'
    };

    return (
        <button
            className={`btn-${variant} ${disabledStyle} ${sizeStyle[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
