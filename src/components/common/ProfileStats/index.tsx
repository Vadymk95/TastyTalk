import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Tooltip } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';
import { UserProfile } from '@root/types';

import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ProfileStatsProps = {
    setCurrentTab: (key: string) => void;
    profile: UserProfile;
    className?: string;
};

export const ProfileStats: FC<ProfileStatsProps> = ({
    setCurrentTab,
    profile,
    className = ''
}) => {
    const { t } = useTranslation();
    const { userProfile, hasPaidPlan } = useAuthStore();

    const numberFormats = (value: number) => {
        if (value >= 1_000_000)
            return `${(value / 1_000_000).toFixed(1)}${t('ProfileStats.million')}`;
        if (value >= 1_000)
            return `${(value / 1_000).toFixed(1)}${t('ProfileStats.thousand')}`;
        return value.toString();
    };

    const handleCheckVerification = (event: MouseEvent) => {
        if (!userProfile?.verified) return event.preventDefault();
    };

    const handleCurrentTab = (key: string) => {
        if (userProfile) setCurrentTab(key);
    };

    const hasPlan = hasPaidPlan();

    return (
        <div
            className={`flex justify-around items-start gap-4 text-center ${className}`}
        >
            <div
                onClick={() => handleCurrentTab('create-recipe')}
                className="cursor-pointer"
            >
                <p className="text-lg font-bold">
                    {numberFormats(profile.recipesCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.recipes')}
                </p>
            </div>

            <Tooltip
                text={t('ProfileStats.tooltip')}
                shouldShow={!hasPlan}
                children={
                    <div
                        onClick={() => handleCurrentTab('create-meal-plan')}
                        className={
                            hasPlan ? 'cursor-pointer' : 'pointer-events-none'
                        }
                    >
                        {hasPlan ? (
                            <p className="text-lg font-bold">
                                {numberFormats(profile.mealPlansCount)}
                            </p>
                        ) : (
                            <FontAwesomeIcon
                                className="text-[1.25rem] leading-[1.25rem]"
                                icon={faBan}
                            />
                        )}
                        <p className="text-sm label sm:text-xs">
                            {t('ProfileStats.mealPlans')}
                        </p>
                    </div>
                }
            />

            <Link
                onClick={(event) => handleCheckVerification(event)}
                to={routes.followers}
                className={`cursor-pointer ${!userProfile?.verified ? 'pointer-events-none' : ''}`}
            >
                <p className="text-lg font-bold">
                    {numberFormats(profile.followersCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.followers')}
                </p>
            </Link>

            <Link
                onClick={(event) => handleCheckVerification(event)}
                to={routes.following}
                className={`cursor-pointer ${!userProfile?.verified ? 'pointer-events-none' : ''}`}
            >
                <p className="text-lg font-bold">
                    {numberFormats(profile.followingCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.following')}
                </p>
            </Link>
        </div>
    );
};
