import { FC } from 'react';

type RadioButtonProps = {
    name: string;
    value: string;
    selectedValue: string | null;
    onChange: (value: string) => void;
    label: string;
    className?: string;
};

export const RadioButton: FC<RadioButtonProps> = ({
    name,
    value,
    selectedValue,
    onChange,
    label,
    className = ''
}) => {
    const isSelected = selectedValue === value;

    return (
        <label
            className={`cursor-pointer flex items-center transition duration-200 leading-tight hover:bg-secondary-light/50 shadow-md gap-2 border rounded-lg p-3 ${
                isSelected
                    ? 'bg-secondary-light border-secondary'
                    : 'bg-neutral-light border-neutral'
            } ${className}`}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
                className="hidden"
            />
            <span
                className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                    isSelected
                        ? 'bg-secondary border-secondary'
                        : 'border-neutral'
                }`}
            >
                {isSelected && (
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                )}
            </span>
            <span className="label text-sm">{label}</span>
        </label>
    );
};
