import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';

interface UserProps {
    username: string;
    id: string;
    handleSubscribe: (id: string) => void;
}

export const User: FC<UserProps> = ({ username, id, handleSubscribe }) => {
    const { t } = useTranslation();
    const [isFollow, setIsFollow] = useState(false);

    const handleOnClick = () => {
        handleSubscribe(id);

        setIsFollow((prev) => !prev);
    };
    return (
        <li className="plate flex items-center justify-between gap-4">
            <span>@{username}</span>
            <Button onClick={handleOnClick}>
                {t(`General.${isFollow ? 'unfollow' : 'follow'}`)}
            </Button>
        </li>
    );
};
