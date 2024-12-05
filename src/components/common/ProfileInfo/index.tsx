import { FC } from 'react';

import { UserProfile } from '@root/types';

interface ProfileInfoProps {
    profile: UserProfile;
    className?: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
    profile,
    className = ''
}) => {
    return (
        <div className={`${className}`}>
            <h1 className="text-2xl sm:text-xl font-bold">
                {profile.username}
            </h1>
            {profile.bio && (
                <p className="label mt-2 sm:text-sm">{profile.bio}</p>
            )}
            <div className="flex mt-4 gap-4 sm:gap-2 flex-wrap sm:text-sm">
                {profile.socialLinks?.map((link, index) => (
                    <p key={index}>
                        <span className="text-primary">
                            {link.name}
                            {': '}
                        </span>
                        <span>{link.url}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};
