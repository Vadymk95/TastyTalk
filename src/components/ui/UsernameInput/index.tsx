import { ErrorMessage, Field, FieldProps, FormikHelpers } from 'formik';
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
    currentUsername?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
};

const debouncedCheckAvailability = debounce(
    async (
        username: string,
        checkUsernameAvailability: (username: string) => Promise<boolean>,
        setIsAvailable: (isAvailable: boolean | null) => void,
        setLoading: (loading: boolean) => void,
        setFieldError: FormikHelpers<any>['setFieldError'],
        name: string,
        errorMsg: string,
        setFieldValue: FormikHelpers<any>['setFieldValue']
    ) => {
        if (username.length < 4) {
            setIsAvailable(null);
            setLoading(false);
            setFieldValue('isChecking', false);
            return;
        }

        setLoading(true);
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
        if (!available) {
            setFieldError(name, errorMsg);
        }
        setLoading(false);
        if (available) setFieldValue('isChecking', false);
    },
    500
);

export const UsernameInput: FC<UsernameInputProps> = ({
    name,
    label,
    isRequired,
    checkUsernameAvailability,
    validationSchema,
    currentUsername,
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
        async (value: string, form: any) => {
            setIsAvailable(null);

            if (currentUsername && value === currentUsername) {
                setLoading(false);
                setIsAvailable(true);
                form.setFieldValue('isChecking', false);
                return;
            }

            const isValid = await validationSchema.isValid(value);
            if (!isValid) {
                setLoading(false);
                form.setFieldValue('isChecking', false);
                return;
            }

            form.setFieldValue('isChecking', true);

            debouncedCheckAvailability(
                value,
                checkUsernameAvailability,
                setIsAvailable,
                setLoading,
                form.setFieldError,
                name,
                t('UsernameInput.taken'),
                form.setFieldValue
            );
        },
        [currentUsername, validationSchema, checkUsernameAvailability, name, t]
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
                {({ field, form }: FieldProps) => (
                    <div className="relative">
                        <input
                            className={`input-primary ${sizeInputStyle[size]} input`}
                            {...field}
                            type="text"
                            placeholder={t('UsernameInput.chooseUsername')}
                            onChange={(e: any) => {
                                field.onChange(e);
                                handleChange(e.target.value, form);
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
