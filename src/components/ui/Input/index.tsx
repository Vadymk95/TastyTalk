import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { FC, useState } from 'react';

type InputProps = {
    name: string;
    type: string;
    label: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
};

export const Input: FC<InputProps> = ({
    name,
    type,
    label,
    isRequired,
    placeholder = '',
    className = '',
    disabled = false,
    size = 'medium'
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const isPasswordType = type === 'password';
    const sizeInputStyle = {
        small: 'input-small',
        medium: 'input-medium',
        large: 'input-large'
    };
    const sizeLabelStyle = {
        small: 'label-small',
        medium: 'label-medium',
        large: 'label-large'
    };

    return (
        <div className={`relative ${className || ''}`}>
            <label className={`text-neutral-dark/60 ${sizeLabelStyle[size]}`}>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <div className="relative">
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <input
                            {...field}
                            className={`input-primary ${sizeInputStyle[size]}`}
                            type={
                                isPasswordType && isPasswordVisible
                                    ? 'text'
                                    : type
                            }
                            placeholder={
                                isPasswordType && isPasswordVisible
                                    ? label
                                    : placeholder
                            }
                            disabled={disabled}
                        />
                    )}
                </Field>

                {isPasswordType && (
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-secondary"
                    >
                        <FontAwesomeIcon
                            size="xl"
                            icon={isPasswordVisible ? faEye : faEyeSlash}
                        />
                    </span>
                )}
            </div>

            {isRequired && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className={`error-absolute ${size === 'small' ? 'top-14' : ''}`}
                />
            )}
        </div>
    );
};
