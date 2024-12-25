import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ProfilePhoto } from '@root/components/common/ProfilePhoto';
import { Button } from '@root/components/ui/Button';
import { getProfileRoute, isMobileDevice } from '@root/helpers';
import { useAuthStore, useUsersStore } from '@root/store';
import { UserProfile } from '@root/types';

interface UserProps {
    user: UserProfile;
}

export const User: FC<UserProps> = ({ user }) => {
    const navigate = useNavigate();
    const { followUser, unfollowUser } = useUsersStore();
    const { t } = useTranslation();
    const { isMe, userProfile } = useAuthStore();
    const isMobile = isMobileDevice();
    const me = isMe(user.username);
    const followingSet = useMemo(
        () => new Set(userProfile?.following || []),
        [userProfile?.following]
    );

    const isFollowing = followingSet.has(user.id);

    const handleOnSubscribe = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (isFollowing) {
            unfollowUser(user.id);
        } else {
            followUser(user.id);
        }
    };

    const handleOnRedirect = () => navigate(getProfileRoute(user.username));

    return (
        <li className="plate flex items-center justify-between gap-4 p-2 hover:bg-neutral active:bg-neutral-50 duration-500">
            <div
                onClick={handleOnRedirect}
                className="flex items-center gap-4 cursor-pointer"
            >
                {user.profileImage && (
                    <ProfilePhoto
                        variant="user"
                        profileImage={user.profileImage}
                    />
                )}
                <div>
                    <p className="sm:text-xs max-w-[225px] sm:max-w-[150px] word-break">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs label">@{user.username}</p>
                </div>
            </div>

            {!me && (
                <Button
                    variant={isFollowing ? 'primary' : 'secondary'}
                    onClick={(event) => handleOnSubscribe(event)}
                    size={isMobile ? 'small' : 'medium'}
                >
                    {t(`General.${isFollowing ? 'unfollow' : 'follow'}`)}
                </Button>
            )}
        </li>
    );
};
