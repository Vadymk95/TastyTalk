import { Input } from '@root/components/ui';
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
        if (!username) {
            setIsAvailable(null);
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
        (username: string) => {
            setIsAvailable(null);
            debouncedCheckAvailability(
                username,
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
        <div className={className}>
            <Input
                name={name}
                type="text"
                label={label}
                isRequired={isRequired}
                placeholder={t('UsernameInput.chooseUsername')}
                onChange={handleChange}
            />
            {loading ? (
                <span className="text-gray-500">
                    {t('UsernameInput.checking')}
                </span>
            ) : isAvailable === null ? null : isAvailable ? (
                <span className="text-green-500">
                    {t('UsernameInput.available')}
                </span>
            ) : (
                <span className="text-red-500">{t('UsernameInput.taken')}</span>
            )}
        </div>
    );
};
