import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserProfile } from '@root/types';

interface ProfileInfoProps {
    profile: UserProfile;
    className?: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
    profile,
    className = ''
}) => {
    const { t } = useTranslation();

    return (
        <div className={`${className}`}>
            <h1 className="text-2xl sm:text-xl font-bold tracking-wide">
                {profile.username}
            </h1>

            {profile.bio && (
                <p className="label mt-1 sm:text-sm">{profile.bio}</p>
            )}

            {profile.socialNetworks && (
                <div className="flex flex-col mt-4 flex-wrap sm:text-sm">
                    <h4 className="text-secondary font-semibold mb-2">
                        {t('ProfilePage.socialNetworks')}
                    </h4>

                    {profile.socialNetworks?.map((sn, index) => (
                        <p key={index} className="mb-2">
                            <span className="label">
                                {sn.name}
                                {': '}
                            </span>
                            <span className="label font-semibold">
                                {sn.profileName}
                            </span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
