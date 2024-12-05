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
        <div className={className}>
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            {profile.bio && (
                <p className="text-neutral-dark mt-2">{profile.bio}</p>
            )}
            <div className="flex gap-4 mt-4 flex-wrap">
                {profile.socialLinks?.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
    );
};
