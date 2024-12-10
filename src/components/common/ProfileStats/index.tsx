import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

type ProfileStatsProps = {
    setCurrentTab: (key: string) => void;
    recipesCount: number;
    mealPlansCount: number;
    followersCount: number;
    followingCount: number;
    className?: string;
};

export const ProfileStats: FC<ProfileStatsProps> = ({
    setCurrentTab,
    recipesCount = 0,
    mealPlansCount = 0,
    followersCount = 0,
    followingCount = 0,
    className = ''
}) => {
    const { t } = useTranslation();
    const { isEmailVerified } = useAuthStore();

    const numberFormats = (value: number) => {
        if (value >= 1_000_000)
            return `${(value / 1_000_000).toFixed(1)}${t('ProfileStats.million')}`;
        if (value >= 1_000)
            return `${(value / 1_000).toFixed(1)}${t('ProfileStats.thousand')}`;
        return value.toString();
    };

    const handleCheckVerification = (event: MouseEvent) => {
        if (!isEmailVerified) return event.preventDefault();
    };

    console.log(!isEmailVerified);

    return (
        <div
            className={`flex justify-around items-start gap-4 text-center ${className}`}
        >
            <div
                onClick={() => setCurrentTab('create-recipe')}
                className="cursor-pointer"
            >
                <p className="text-lg font-bold">
                    {numberFormats(recipesCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.recipes')}
                </p>
            </div>

            <div
                onClick={() => setCurrentTab('create-meal-plan')}
                className="cursor-pointer"
            >
                <p className="text-lg font-bold">
                    {numberFormats(mealPlansCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.mealPlans')}
                </p>
            </div>

            <Link
                onClick={(event) => handleCheckVerification(event)}
                to={routes.followers}
                className={`cursor-pointer ${!isEmailVerified ? 'pointer-events-none' : ''}`}
            >
                <p className="text-lg font-bold">
                    {numberFormats(followersCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.followers')}
                </p>
            </Link>

            <Link
                onClick={(event) => handleCheckVerification(event)}
                to={routes.following}
                className={`cursor-pointer ${!isEmailVerified ? 'pointer-events-none' : ''}`}
            >
                <p className="text-lg font-bold">
                    {numberFormats(followingCount)}
                </p>
                <p className="text-sm label sm:text-xs">
                    {t('ProfileStats.following')}
                </p>
            </Link>
        </div>
    );
};
