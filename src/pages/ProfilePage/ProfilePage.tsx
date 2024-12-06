import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MyMealPlans, MyRecipes, Profile } from '@root/components/common';
import { Loader, Tabs } from '@root/components/ui';
import { useAuthStore } from '@root/store';

const ProfilePage: FC = () => {
    const { userProfile, loading, error } = useAuthStore();
    const { t } = useTranslation();
    const [profile, setProfile] = useState(userProfile);
    const tabs = [
        { key: 'create-recipe', label: t('ProfilePage.myRecipes') },
        {
            key: 'create-meal-plan',
            label: t('ProfilePage.myMealPlans')
        }
    ];
    const [currentTab, setCurrentTab] = useState(tabs[0].key);

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

            {currentTab === 'create-recipe' ? <MyRecipes /> : <MyMealPlans />}
        </div>
    );
};

export default ProfilePage;
