import { FC, useState } from 'react';

import { Input } from '@root/components/ui';

type UsernameInputProps = {
    name: string;
    label: string;
    isRequired: boolean;
    debounceDelay?: number;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
};

export const UsernameInput: FC<UsernameInputProps> = ({
    name,
    label,
    isRequired,
    debounceDelay = 500,
    checkUsernameAvailability
}) => {
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
                placeholder="Choose a username"
                debounceDelay={debounceDelay}
                onChange={handleUsernameChange}
            />
            {loading ? (
                <span className="text-gray-500">Checking...</span>
            ) : isAvailable === null ? null : isAvailable ? (
                <span className="text-green-500">Username is available</span>
            ) : (
                <span className="text-red-500">Username is already taken</span>
            )}
        </div>
    );
};
