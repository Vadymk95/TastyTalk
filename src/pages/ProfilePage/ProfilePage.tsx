import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Image, Loader, Tabs } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfilePage: FC = () => {
    const { userProfile, loading, error } = useAuthStore();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [profile, setProfile] = useState(userProfile);
    const tabs = [
        { key: routes.recipesCreate, label: 'создание рецепта' },
        {
            key: routes.mealsPlanCreate,
            label: 'создание плана питания'
        }
    ];
    const [currentTab, setCurrentTab] = useState<string | null>(null);

    useEffect(() => {
        if (currentTab) {
            navigate(currentTab);
        }
    }, [currentTab, navigate]);

    useEffect(() => {
        if (!loading && userProfile) {
            setProfile(userProfile);
        }
    }, [loading, userProfile]);

    if (loading) {
        return <Loader />;
    }

    if (error || !profile) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>{t('Profile.errorLoading')}</div>
            </div>
        );
    }

    return (
        <div className="plate">
            {/* Верхний блок профиля */}
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
                        {profile &&
                            profile.socialLinks?.map((link, index) => (
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
                    <Link
                        to={routes.settings}
                        className="flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faGear} />
                        {t('Profile.editProfile')}
                    </Link>
                </div>
            </section>

            <Tabs
                fullwidth
                tabs={tabs}
                variant="secondary"
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
            />

            {/* Блок фильтров */}
            {/* <FilterBlock
                onFilterChange={(filters) => {
                    console.log('Filters applied:', filters);
                }}
            /> */}

            {/* Сетка рецептов */}
            {/* <div className="mt-6">
                <RecipeGrid
                    recipes={[]}
                    onRecipeClick={(recipeId) => {
                        console.log('Recipe clicked:', recipeId);
                    }}
                />
            </div> */}
        </div>
    );
};

export default ProfilePage;
