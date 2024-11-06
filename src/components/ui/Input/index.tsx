import { ErrorMessage, Field } from 'formik';
import { FC, useState } from 'react';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const isPasswordType = type === 'password';

    return (
        <div className={`${className || ''} relative`}>
            <label>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <div className="relative">
                <Field
                    className="input-primary"
                    name={name}
                    type={isPasswordType && isPasswordVisible ? 'text' : type}
                    placeholder={
                        isPasswordType && isPasswordVisible
                            ? label
                            : placeholder
                    }
                />
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
