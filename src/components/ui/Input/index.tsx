import { ErrorMessage, Field, FieldProps } from 'formik';
import { ChangeEvent, FC, FocusEvent, useState } from 'react';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InputProps = {
    name: string;
    type?: string;
    label: string;
    isRequired?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    min?: number;
};

export const Input: FC<InputProps> = ({
    name,
    type = 'text',
    label,
    isRequired = false,
    placeholder = '',
    className = '',
    disabled = false,
    size = 'medium',
    min = 1
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

    const handleBlur = (
        event: FocusEvent<HTMLInputElement>,
        formBlur: (e: FocusEvent<HTMLInputElement>) => void,
        setValue: (value: string) => void
    ) => {
        formBlur(event);

        if (type === 'number') {
            const value = event.target.value;

            if (value === '' || parseInt(value, 10) < min) {
                setValue(min.toString());
            } else if (value.startsWith('0')) {
                setValue(parseInt(value, 10).toString());
            }
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        formChange: (e: ChangeEvent<HTMLInputElement>) => void
    ) => {
        formChange(event);
    };

    return (
        <div className={`relative ${className || ''}`}>
            <label className={`label ${sizeLabelStyle[size]}`}>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <div>
                <Field name={name}>
                    {({ field, form }: FieldProps) => (
                        <div className="relative">
                            <input
                                {...field}
                                className={`input-primary ${sizeInputStyle[size]} input ${
                                    disabled
                                        ? 'bg-neutral pointer-events-none'
                                        : ''
                                }`}
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
                                onChange={(event) =>
                                    handleChange(event, form.handleChange)
                                }
                                disabled={disabled}
                                onBlur={(event) =>
                                    handleBlur(
                                        event,
                                        form.handleBlur,
                                        form.setFieldValue.bind(null, name)
                                    )
                                }
                                min={type === 'number' ? min : undefined}
                            />
                            {isRequired && (
                                <ErrorMessage
                                    name={name}
                                    render={(msg) =>
                                        typeof msg === 'string' ? (
                                            <div
                                                className={`error-absolute ${size === 'small' ? 'top-8' : ''}`}
                                            >
                                                {msg}
                                            </div>
                                        ) : null
                                    }
                                />
                            )}

                            {isPasswordType && (
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-secondary"
                                >
                                    <FontAwesomeIcon
                                        size="xl"
                                        icon={
                                            isPasswordVisible
                                                ? faEye
                                                : faEyeSlash
                                        }
                                    />
                                </span>
                            )}
                        </div>
                    )}
                </Field>
            </div>
        </div>
    );
};
