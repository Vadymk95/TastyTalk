import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@root/components/ui/Button';
import { routes } from '@root/router/routes';
import { useAuthStore, useFollowingStore } from '@root/store';
import { UserProfile } from '@root/types';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProfileToolsProps {
    profile: UserProfile;
}

export const ProfileTools: FC<ProfileToolsProps> = ({ profile }) => {
    const { t } = useTranslation();
    const { username } = useParams();
    const {
        followUser,
        unfollowUser,
        loadingFollow,
        loadingUnfollow,

        getFollowStatuses,
        followStatusCache
    } = useFollowingStore();
    const { isMe } = useAuthStore();
    const me = isMe(username || '');

    useEffect(() => {
        const checkFollowStatuses = async () => {
            await getFollowStatuses([profile.id]);
        };

        if (profile.id) {
            checkFollowStatuses();
        }
    }, [profile.id, getFollowStatuses]);

    const handleOnSubscribe = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();

        if (loadingFollow || loadingUnfollow) return;

        if (followStatusCache[profile.id] || false) {
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
                    variant={
                        followStatusCache[profile.id] || false
                            ? 'primary'
                            : 'accent'
                    }
                >
                    {t(
                        `General.${followStatusCache[profile.id] || false ? 'unfollow' : 'follow'}`
                    )}
                </Button>
            )}
        </div>
    );
};
