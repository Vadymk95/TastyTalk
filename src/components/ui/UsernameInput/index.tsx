import { ErrorMessage, Field, FieldProps } from 'formik';
import debounce from 'lodash/debounce';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type UsernameInputProps = {
    name: string;
    label: string;
    isRequired: boolean;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    className?: string;
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
    className = ''
}) => {
    const { t } = useTranslation();
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback(
        (value: string) => {
            setIsAvailable(null);
            debouncedCheckAvailability(
                value,
                checkUsernameAvailability,
                setIsAvailable,
                setLoading
            );
        },
        [checkUsernameAvailability]
    );

    useEffect(() => {
        return () => {
            debouncedCheckAvailability.cancel();
        };
    }, []);

    return (
        <div className={`${className || ''} relative`}>
            <label>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <Field name={name}>
                {({ field }: FieldProps) => (
                    <input
                        className="input-primary"
                        {...field}
                        type="text"
                        placeholder={t('UsernameInput.chooseUsername')}
                        onChange={(e: any) => {
                            field.onChange(e);
                            handleChange(e.target.value);
                        }}
                    />
                )}
            </Field>
            {loading ? (
                <span className="text-neutral-500 username-abosulte">
                    {t('UsernameInput.checking')}
                </span>
            ) : isAvailable === null ? null : isAvailable ? (
                <span className="text-secondary username-abosulte">
                    {t('UsernameInput.available')}
                </span>
            ) : (
                <span className="text-primary username-abosulte">
                    {t('UsernameInput.taken')}
                </span>
            )}

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
