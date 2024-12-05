import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

interface ProfilePhotoProps {
    profileImage: string | File | null;
}

export const ProfilePhoto: FC<ProfilePhotoProps> = ({ profileImage }) => {
    const { t } = useTranslation();
    return (
        <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-secondary">
            {profileImage ? (
                <Image
                    src={
                        typeof profileImage === 'string'
                            ? profileImage
                            : URL.createObjectURL(profileImage)
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
    );
};
