import { ErrorMessage, Field, FieldProps } from 'formik';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InputProps = {
    name: string;
    type: string;
    label: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
    debounceDelay?: number;
    onChange?: (value: string) => void;
};

export const Input: FC<InputProps> = ({
    name,
    type,
    label,
    isRequired,
    placeholder,
    className,
    debounceDelay = 0,
    onChange
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const isPasswordType = type === 'password';

    useEffect(() => {
        if (debounceDelay > 0 && onChange) {
            const handler = setTimeout(() => {
                onChange(inputValue);
            }, debounceDelay);

            return () => clearTimeout(handler);
        }
    }, [inputValue, debounceDelay, onChange]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Direct onChange call if no debounce is set
        if (debounceDelay === 0 && onChange) {
            onChange(value);
        }
    };

    return (
        <div className={`${className || ''} relative`}>
            <label>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <div className="relative">
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <input
                            {...field}
                            className="input-primary"
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
                            onChange={handleChange}
                            value={inputValue}
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
                    className="error-absolute"
                />
            )}
        </div>
    );
};
