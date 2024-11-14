import { useField } from 'formik';
import { ChangeEvent, FC } from 'react';

interface TextareaProps {
    name: string;
    label: string;
    maxLength?: number;
    placeholder?: string;
}

export const Textarea: FC<TextareaProps> = ({
    name,
    label,
    maxLength,
    placeholder
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength && e.target.value.length > maxLength) return;
        setValue(e.target.value);
    };

    return (
        <div className="textarea-wrapper">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <textarea
                id={name}
                {...field}
                placeholder={placeholder}
                className={`textarea-primary ${meta.touched && meta.error ? 'textarea-error' : ''}`}
                onChange={handleChange}
            />
            {maxLength && (
                <div className="text-xs text-gray-500 mt-1">
                    {field.value.length}/{maxLength}
                </div>
            )}
            {meta.touched && meta.error && (
                <div className="text-red-500 text-xs mt-1">{meta.error}</div>
            )}
        </div>
    );
};
