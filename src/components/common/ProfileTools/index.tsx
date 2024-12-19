import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore, useUsersStore } from '@root/store';
import { UserProfile } from '@root/types';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProfileToolsProps {
    profile: UserProfile;
}

export const ProfileTools: FC<ProfileToolsProps> = ({ profile }) => {
    const { t } = useTranslation();
    const { username } = useParams();
    const { followUser, unfollowUser } = useUsersStore();
    const { isMe, userProfile } = useAuthStore();
    const me = isMe(username || '');
    const followingSet = useMemo(
        () => new Set(userProfile?.following || []),
        [userProfile?.following]
    );
    const isFollowing = followingSet.has(profile.id);

    const handleOnSubscribe = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (isFollowing) {
            unfollowUser(profile.id);
        } else {
            followUser(profile.id);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-end">
            {me && (
                <Link
                    to={routes.settings}
                    className="flex items-center gap-2 link-thirtiary"
                >
                    <FontAwesomeIcon className="sm:text-2xl" icon={faGear} />
                    <span className=" sm:hidden">{t('General.settings')}</span>
                </Link>
            )}

            {!me && (
                <Button
                    onClick={handleOnSubscribe}
                    variant={isFollowing ? 'primary' : 'accent'}
                >
                    {t(`General.${isFollowing ? 'unfollow' : 'follow'}`)}
                </Button>
            )}
        </div>
    );
};
