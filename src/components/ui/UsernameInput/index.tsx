import { FC, useState } from 'react';

import { Input } from '@root/components/ui';
import { useTranslation } from 'react-i18next';

type UsernameInputProps = {
    name: string;
    label: string;
    isRequired: boolean;
    debounceDelay?: number;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    className?: string;
};

export const UsernameInput: FC<UsernameInputProps> = ({
    name,
    label,
    isRequired,
    debounceDelay = 500,
    checkUsernameAvailability,
    className = ''
}) => {
    const { t } = useTranslation();
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = async (username: string) => {
        if (!username) {
            setIsAvailable(null);
            return;
        }

        setLoading(true);
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
        setLoading(false);
    };

    return (
        <div>
            <Input
                name={name}
                type="text"
                label={label}
                isRequired={isRequired}
                placeholder={t('UsernameInput.chooseUsername')}
                debounceDelay={debounceDelay}
                onChange={handleUsernameChange}
                className={className}
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
