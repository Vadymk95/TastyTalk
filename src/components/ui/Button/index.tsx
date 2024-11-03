import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
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
    const variantStyle =
        variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
    const disabledStyle = disabled ? 'btn-disabled' : '';

    const sizeStyle = {
        small: 'btn-small',
        medium: 'btn-medium',
        large: 'btn-large'
    };

    return (
        <button
            className={`${variantStyle} ${disabledStyle} ${sizeStyle[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
