import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { countries } from '@root/constants/countries';
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
    const hasNameOrCountry = profile?.showName || profile?.showCountry;

    return (
        <div className={`${className}`}>
            <h1 className="text-2xl sm:text-xl font-bold tracking-wide">
                {profile.username}
            </h1>

            {hasNameOrCountry && (
                <div className="mb-4 flex flex-col gap-1">
                    {profile?.showName && (
                        <p className="label sm:text-sm whitespace-pre-line font-semibold">
                            {profile.firstName} {profile.lastName}
                        </p>
                    )}

                    {profile?.showCountry && profile.country && (
                        <p className="label sm:text-sm whitespace-pre-line font-semibold">
                            {countries.find((c) => c.code === profile.country)
                                ?.name || ''}
                        </p>
                    )}
                </div>
            )}

            {profile.bio && (
                <p className="label mt-1 sm:text-sm whitespace-pre-line">
                    {profile.bio}
                </p>
            )}

            {profile.socialNetworks && !!profile.socialNetworks.length && (
                <div className="flex flex-col mt-4 flex-wrap sm:text-sm gap-2">
                    <h4 className="text-secondary font-semibold">
                        {t('ProfilePage.socialNetworks')}
                    </h4>

                    {profile.socialNetworks?.map((socialNetwork, index) => (
                        <p key={index}>
                            <span className="label">
                                {socialNetwork.name}
                                {': '}
                            </span>
                            <span className="label font-semibold">
                                {socialNetwork.profileName}
                            </span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
