import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { getProfileRoute, isMobileDevice } from '@root/helpers';
import { useAuthStore } from '@root/store';
import { UserProfile } from '@root/types';

interface UserProps {
    user: UserProfile;
    handleSubscribe: (id: string) => void;
}

export const User: FC<UserProps> = ({ user, handleSubscribe }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isMe } = useAuthStore();
    const [isFollow, setIsFollow] = useState(false);
    const isMobile = isMobileDevice();
    const me = isMe(user.username);

    const handleOnSubscribe = () => {
        handleSubscribe(user.id);

        setIsFollow((prev) => !prev);
    };

    const handleOnRedirect = () => navigate(getProfileRoute(user.username));

    return (
        <li
            onClick={handleOnRedirect}
            className="plate flex items-center justify-between gap-4 p-2 cursor-pointer hover:bg-neutral active:bg-neutral-50 active:scale-100 duration-500 hover:scale-95"
        >
            <div>
                <p className="sm:text-xs">
                    {user.firstName} {user.lastName}
                </p>
                <p className="text-xs label">@{user.username}</p>
            </div>

            {!me && (
                <Button
                    variant={isFollow ? 'primary' : 'secondary'}
                    onClick={handleOnSubscribe}
                    size={isMobile ? 'small' : 'medium'}
                >
                    {t(`General.${isFollow ? 'unfollow' : 'follow'}`)}
                </Button>
            )}
        </li>
    );
};
