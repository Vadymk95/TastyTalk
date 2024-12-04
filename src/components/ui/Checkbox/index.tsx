import { ChangeEvent, FC } from 'react';

interface CheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
    name,
    label,
    checked,
    onChange,
    className = ''
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={handleChange}
                className="checkbox checkbox-primary cursor-pointer"
            />
            <label htmlFor={name} className="text-sm cursor-pointer">
                {label}
            </label>
        </div>
    );
};
