import { FC } from 'react';

import {
    ProfileInfo,
    ProfilePhoto,
    ProfileStats,
    ProfileTools
} from '@root/components/common';
import { useAuthStore } from '@root/store';
import { UserProfile } from '@root/types';

interface ProfileProps {
    profile: UserProfile | null;
    setCurrentTab: (key: string) => void;
}

export const Profile: FC<ProfileProps> = ({ profile, setCurrentTab }) => {
    const { userProfile } = useAuthStore();
    return (
        <section className="mb-6 relative">
            <div className="flex sm:flex-col items-center sm:items-start gap-6 sm:gap-2">
                <ProfilePhoto profileImage={profile?.profileImage || ''} />
                <ProfileInfo
                    className="flex-1"
                    profile={profile as UserProfile}
                />
            </div>

            <ProfileStats
                setCurrentTab={setCurrentTab}
                className="mt-6"
                profile={profile as UserProfile}
            />

            {userProfile && (
                <div className="absolute right-0 top-0">
                    <ProfileTools profile={profile as UserProfile} />
                </div>
            )}
        </section>
    );
};
