import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';
import { isMobileDevice } from '@root/helpers';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProfilePhotoProps {
    profileImage: string | File | null;
}

export const ProfilePhoto: FC<ProfilePhotoProps> = ({ profileImage }) => {
    const { t } = useTranslation();
    const isMobile = isMobileDevice();

    return (
        <div className="w-36 h-36 sm:w-20 sm:h-20 overflow-hidden rounded-full">
            {profileImage ? (
                <Image
                    src={
                        typeof profileImage === 'string'
                            ? profileImage
                            : URL.createObjectURL(profileImage)
                    }
                    alt={t('General.profilePhoto')}
                    className="object-cover w-full h-full"
                />
            ) : (
                <div className="bg-neutral-light text-neutral-300 w-full h-full flex flex-col gap-2 items-center justify-center">
                    <FontAwesomeIcon
                        size={isMobile ? '2x' : '3x'}
                        icon={faUser}
                    />
                    <span className="sm:text-xs">{t('General.noImage')}</span>
                </div>
            )}
        </div>
    );
};
