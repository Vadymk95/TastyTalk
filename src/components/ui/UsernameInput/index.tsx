import { ErrorMessage, Field, FieldProps } from 'formik';
import debounce from 'lodash/debounce';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type UsernameInputProps = {
    name: string;
    label: string;
    isRequired: boolean;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    validationSchema: Yup.StringSchema;
    className?: string;
    size?: 'small' | 'medium' | 'large';
};

const debouncedCheckAvailability = debounce(
    async (
        username: string,
        checkUsernameAvailability: (username: string) => Promise<boolean>,
        setIsAvailable: (isAvailable: boolean | null) => void,
        setLoading: (loading: boolean) => void
    ) => {
        if (username.length < 4) {
            setIsAvailable(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
        setLoading(false);
    },
    500
);

export const UsernameInput: FC<UsernameInputProps> = ({
    name,
    label,
    isRequired,
    checkUsernameAvailability,
    validationSchema,
    className = '',
    size = 'medium'
}) => {
    const { t } = useTranslation();
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

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

    const handleChange = useCallback(
        async (value: string) => {
            setIsAvailable(null);

            const isValid = await validationSchema.isValid(value);
            if (!isValid) {
                setLoading(false);
                return;
            }

            debouncedCheckAvailability(
                value,
                checkUsernameAvailability,
                setIsAvailable,
                setLoading
            );
        },
        [checkUsernameAvailability, validationSchema]
    );

    useEffect(() => {
        return () => {
            debouncedCheckAvailability.cancel();
        };
    }, []);

    return (
        <div className={`relative ${className || ''}`}>
            <label className={`label ${sizeLabelStyle[size]}`}>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <Field name={name}>
                {({ field }: FieldProps) => (
                    <div className="relative">
                        <input
                            className={`input-primary ${sizeInputStyle[size]} input`}
                            {...field}
                            type="text"
                            placeholder={t('UsernameInput.chooseUsername')}
                            onChange={(e: any) => {
                                field.onChange(e);
                                handleChange(e.target.value);
                            }}
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
                    </div>
                )}
            </Field>
            {loading ? (
                <span className="text-neutral-500 username-abosulute">
                    {t('UsernameInput.checking')}
                </span>
            ) : isAvailable === null ? null : isAvailable ? (
                <span className="text-secondary username-abosulute">
                    {t('UsernameInput.available')}
                </span>
            ) : (
                <span className="text-primary username-abosulute">
                    {t('UsernameInput.taken')}
                </span>
            )}
        </div>
    );
};
