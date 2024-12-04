import { ChangeEvent, FC, useState } from 'react';

interface CheckboxProps {
    name: string;
    label: string;
    className?: string;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
    name,
    label,
    className = '',
    defaultChecked = false,
    onChange
}) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={isChecked}
                onChange={handleChange}
                className="checkbox checkbox-primary cursor-pointer"
            />
            <label htmlFor={name} className="text-sm cursor-pointer">
                {label}
            </label>
        </div>
    );
};
