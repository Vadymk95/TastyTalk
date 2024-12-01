import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'close' | 'neutral';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
    type: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'medium',
            disabled = false,
            type = 'button',
            className,
            children,
            ...props
        },
        ref
    ) => {
        const disabledStyle = disabled ? 'btn-disabled' : '';

        const sizeStyle = {
            small: 'btn-small',
            medium: 'btn-medium',
            large: 'btn-large'
        };

        return (
            <button
                type={type}
                ref={ref}
                className={`btn-${variant} ${disabledStyle} ${sizeStyle[size]} btn ${className}`}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
