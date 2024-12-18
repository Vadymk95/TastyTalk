import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';
import { isMobileDevice } from '@root/helpers';
import { useAuthStore } from '@root/store';
import { UserProfile } from '@root/types';

interface UserProps {
    user: UserProfile;
    handleSubscribe: (id: string) => void;
}

export const User: FC<UserProps> = ({ user, handleSubscribe }) => {
    const { t } = useTranslation();
    const { isMe } = useAuthStore();
    const [isFollow, setIsFollow] = useState(false);
    const isMobile = isMobileDevice();
    const me = isMe(user.username);

    const handleOnClick = () => {
        handleSubscribe(user.id);

        setIsFollow((prev) => !prev);
    };
    return (
        <li className="plate flex items-center justify-between gap-4 p-2">
            <div>
                <p className="sm:text-xs">
                    {user.firstName} {user.lastName}
                </p>
                <p className="text-xs label">@{user.username}</p>
            </div>

            {!me && (
                <Button
                    variant={isFollow ? 'primary' : 'secondary'}
                    onClick={handleOnClick}
                    size={isMobile ? 'small' : 'medium'}
                >
                    {t(`General.${isFollow ? 'unfollow' : 'follow'}`)}
                </Button>
            )}
        </li>
    );
};
