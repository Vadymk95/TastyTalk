import { useField } from 'formik';
import { ChangeEvent, FC } from 'react';

interface TextareaProps {
    name: string;
    label: string;
    maxLength?: number;
    placeholder?: string;
    size?: 'medium' | 'large';
}

export const Textarea: FC<TextareaProps> = ({
    name,
    label,
    maxLength,
    placeholder,
    size = 'medium'
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const sizeClass = size === 'large' ? 'textarea-large' : 'textarea-medium';

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength && e.target.value.length > maxLength) return;
        setValue(e.target.value);
    };

    return (
        <div className="textarea-wrapper">
            <label htmlFor={name} className="block text-neutral-dark/60">
                {label}
            </label>

            <textarea
                id={name}
                {...field}
                placeholder={placeholder}
                className={`textarea-primary ${sizeClass} ${meta.touched && meta.error ? 'textarea-error' : ''}`}
                onChange={handleChange}
            />

            {maxLength && (
                <div className="text-xs text-gray-500 absolute left-0">
                    {field.value.length}/{maxLength}
                </div>
            )}

            {meta.touched && meta.error && (
                <div className="text-primary text-xs absolute right-0">
                    {meta.error}
                </div>
            )}
        </div>
    );
};
