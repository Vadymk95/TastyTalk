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
        <section className="flex sm:flex-col items-center gap-6 sm:gap-4 md:flex-row md:items-start md:gap-8 mb-6">
            <ProfilePhoto profileImage={profile.profileImage || ''} />
            <ProfileInfo className="flex-1" profile={profile} />
            <ProfileTools />
        </section>
    );
};
