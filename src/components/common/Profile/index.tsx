import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Image } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { UserProfile } from '@root/types';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProfileProps {
    profile: UserProfile;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
    const { t } = useTranslation();

    return (
        <section className="flex sm:flex-col items-center gap-6 sm:gap-4 md:flex-row md:items-start md:gap-8 mb-6">
            <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-secondary">
                {profile.profileImage ? (
                    <Image
                        src={
                            typeof profile.profileImage === 'string'
                                ? profile.profileImage
                                : URL.createObjectURL(profile.profileImage)
                        }
                        alt={t('Profile.profileImageAlt')}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="bg-neutral-light w-full h-full flex items-center justify-center text-primary text-xl">
                        {t('Profile.noImage')}
                    </div>
                )}
            </div>

            <div className="flex-1">
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

            <div>
                <Link to={routes.settings} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faGear} />
                    {t('Profile.editProfile')}
                </Link>
            </div>
        </section>
    );
};
