import { ChangeEvent, FC } from 'react';

interface CheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    size?: 'small' | 'medium';
}

export const Checkbox: FC<CheckboxProps> = ({
    name,
    label,
    checked,
    onChange,
    className = '',
    size = 'small'
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    const sizeClasses = {
        small: {
            input: 'w-4 h-4',
            label: 'text-sm'
        },
        medium: {
            input: 'w-5 h-5',
            label: 'text-base'
        }
    };

    const { input, label: labelClass } = sizeClasses[size];

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={handleChange}
                className={`cursor-pointer accent-secondary ${input}`}
            />
            <label htmlFor={name} className={`cursor-pointer ${labelClass}`}>
                {label}
            </label>
        </div>
    );
};
