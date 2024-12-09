import { FC } from 'react';

import {
    ProfileInfo,
    ProfilePhoto,
    ProfileStats,
    ProfileTools
} from '@root/components/common';
import { UserProfile } from '@root/types';

interface ProfileProps {
    profile: UserProfile;
    setCurrentTab: (key: string) => void;
}

export const Profile: FC<ProfileProps> = ({ profile, setCurrentTab }) => {
    return (
        <section className="mb-6 relative">
            <div className="flex sm:flex-col items-center sm:items-start gap-6 sm:gap-2">
                <ProfilePhoto profileImage={profile.profileImage || ''} />
                <ProfileInfo className="flex-1" profile={profile} />
            </div>

            <ProfileStats
                setCurrentTab={setCurrentTab}
                className="mt-6"
                recipesCount={0}
                mealPlansCount={0}
                followersCount={0}
                followingCount={0}
            />

            <div className="absolute right-0 top-0">
                <ProfileTools />
            </div>
        </section>
    );
};
