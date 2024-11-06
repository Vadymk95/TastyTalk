import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { ChangeEvent, FC, useState } from 'react';

type InputProps = {
    name: string;
    type: string;
    label: string;
    isRequired: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
};

export const Input: FC<InputProps> = ({
    name,
    type,
    label,
    isRequired,
    placeholder,
    className,
    onChange
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const isPasswordType = type === 'password';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (onChange) {
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
