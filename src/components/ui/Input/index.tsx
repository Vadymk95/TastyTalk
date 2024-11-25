import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { FC, FocusEvent, useState } from 'react';

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
    isRequired,
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
        setValue: (value: string) => void
    ) => {
        const value = event.target.value;

        // Удаляем ведущие нули и приводим значение к минимальному, если оно пустое
        if (type === 'number') {
            if (value === '' || parseInt(value, 10) < min) {
                setValue(min.toString());
            } else if (value.startsWith('0')) {
                setValue(parseInt(value, 10).toString()); // Удаляем ведущие нули
            }
        }
    };

    return (
        <div className={`relative ${className || ''}`}>
            <label className={`text-neutral-dark/60 ${sizeLabelStyle[size]}`}>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <div className="relative">
                <Field name={name}>
                    {({ field, form }: FieldProps) => (
                        <input
                            {...field}
                            className={`input-primary ${sizeInputStyle[size]} input ${
                                disabled ? 'bg-neutral pointer-events-none' : ''
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
                            disabled={disabled}
                            onBlur={
                                type === 'number'
                                    ? (event) =>
                                          handleBlur(
                                              event,
                                              form.setFieldValue.bind(
                                                  null,
                                                  name
                                              )
                                          )
                                    : undefined
                            }
                            min={type === 'number' ? min : undefined}
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
                    className={`error-absolute ${
                        size === 'small' ? 'top-14' : ''
                    }`}
                />
            )}
        </div>
    );
};
