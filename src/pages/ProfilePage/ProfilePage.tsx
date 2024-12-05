import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Profile } from '@root/components/common';
import { Loader, Tabs } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

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
            <Profile profile={profile} />

            <Tabs
                fullwidth
                tabs={tabs}
                variant="secondary"
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
            />

            {/* <FilterBlock
                onFilterChange={(filters) => {
                    console.log('Filters applied:', filters);
                }}
            /> */}

            {/* <RecipeGrid
                    recipes={[]}
                    onRecipeClick={(recipeId) => {
                        console.log('Recipe clicked:', recipeId);
                    }}
                /> */}
        </div>
    );
};

export default ProfilePage;
