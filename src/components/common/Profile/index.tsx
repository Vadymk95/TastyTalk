import { FC } from 'react';

import {
    ProfileInfo,
    ProfilePhoto,
    ProfileTools
} from '@root/components/common';
import { UserProfile } from '@root/types';

interface ProfileProps {
    profile: UserProfile;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
    return (
        <section className="flex sm:flex-col items-center sm:items-start gap-6 sm:gap-2 mb-6 relative">
            <ProfilePhoto profileImage={profile.profileImage || ''} />
            <ProfileInfo className="flex-1" profile={profile} />

            <div className="absolute right-0 top-0">
                <ProfileTools />
            </div>
        </section>
    );
};
