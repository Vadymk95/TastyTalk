import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    variant = 'primary',
    disabled = false,
    children,
    ...props
}) => {
    const variantStyle =
        variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
    const disabledStyle = disabled ? 'btn-disabled' : '';

    return (
        <button
            className={`${variantStyle} ${disabledStyle}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
