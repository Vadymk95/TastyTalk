import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ProfileStatsProps = {
    recipesCount: number;
    mealPlansCount: number;
    followersCount: number;
    followingCount: number;
    className?: string;
};

export const ProfileStats: FC<ProfileStatsProps> = ({
    recipesCount = 0,
    mealPlansCount = 0,
    followersCount = 0,
    followingCount = 0,
    className = ''
}) => {
    const { t } = useTranslation();

    const numberFormats = (value: number) => {
        if (value >= 1_000_000)
            return `${(value / 1_000_000).toFixed(1)}${t('ProfileStats.million')}`;
        if (value >= 1_000)
            return `${(value / 1_000).toFixed(1)}${t('ProfileStats.thousand')}`;
        return value.toString();
    };

    return (
        <div
            className={`flex justify-around items-start gap-4 text-center ${className}`}
        >
            <div className="stat-item cursor-pointer">
                <p className="text-lg font-bold">
                    {numberFormats(recipesCount)}
                </p>
                <p className="text-sm label">{t('ProfileStats.recipes')}</p>
            </div>

            <div className="stat-item cursor-pointer">
                <p className="text-lg font-bold">
                    {numberFormats(mealPlansCount)}
                </p>
                <p className="text-sm label">{t('ProfileStats.mealPlans')}</p>
            </div>

            <div className="stat-item cursor-pointer">
                <p className="text-lg font-bold">
                    {numberFormats(followersCount)}
                </p>
                <p className="text-sm label">{t('ProfileStats.followers')}</p>
            </div>

            <div className="stat-item cursor-pointer">
                <p className="text-lg font-bold">
                    {numberFormats(followingCount)}
                </p>
                <p className="text-sm label">{t('ProfileStats.following')}</p>
            </div>
        </div>
    );
};
