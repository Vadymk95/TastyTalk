import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';
import { isMobileDevice } from '@root/helpers';

interface UserProps {
    username: string;
    id: string;
    handleSubscribe: (id: string) => void;
}

export const User: FC<UserProps> = ({ username, id, handleSubscribe }) => {
    const { t } = useTranslation();
    const [isFollow, setIsFollow] = useState(false);
    const isMobile = isMobileDevice();

    const handleOnClick = () => {
        handleSubscribe(id);

        setIsFollow((prev) => !prev);
    };
    return (
        <li className="plate flex items-center justify-between gap-4 p-2">
            <span className="sm:text-xs">@{username}</span>
            <Button
                variant={isFollow ? 'primary' : 'secondary'}
                onClick={handleOnClick}
                size={isMobile ? 'small' : 'medium'}
            >
                {t(`General.${isFollow ? 'unfollow' : 'follow'}`)}
            </Button>
        </li>
    );
};
