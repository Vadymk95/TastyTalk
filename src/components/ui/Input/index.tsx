import { ErrorMessage, Field } from 'formik';
import { FC } from 'react';

type InputProps = {
    name: string;
    type: string;
    label: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
};

export const Input: FC<InputProps> = ({
    name,
    type,
    label,
    isRequired,
    placeholder,
    className
}) => {
    return (
        <div className={className || ''}>
            <label>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <Field
                className="input-primary"
                name={name}
                type={type}
                placeholder={placeholder || ''}
            />

            {isRequired && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="error-absolute"
                />
            )}
        </div>
    );
};
