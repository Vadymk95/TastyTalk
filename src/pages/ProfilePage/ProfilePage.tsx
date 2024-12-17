import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
    ErrorBoundary,
    MyMealPlans,
    MyRecipes,
    Profile
} from '@root/components/common';
import { Loader, Tabs } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore, useUsersStore } from '@root/store';

const ProfilePage: FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { userProfile, loading, error } = useAuthStore();
    const { fetchUserByUsername } = useUsersStore();
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
        const loadProfile = async () => {
            if (!username) return;

            if (userProfile && userProfile.username === username) {
                setProfile(userProfile);
                return;
            }

            const anotherUser = await fetchUserByUsername(username);

            if (!anotherUser) {
                return navigate(routes.home);
            }

            setProfile(anotherUser);
        };

        loadProfile();
    }, [username, userProfile, fetchUserByUsername, navigate]);

    useEffect(() => {
        if (!loading && userProfile) {
            setProfile(userProfile);
        }
    }, [loading, userProfile]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorBoundary />;
    }

    return (
        <div className="plate">
            <Profile setCurrentTab={setCurrentTab} profile={profile} />

            {!!userProfile && (
                // добавить чек, может ли зарегистрированный юзер видеть табы другого юзера
                <Tabs
                    fullwidth
                    tabs={tabs}
                    variant="secondary"
                    activeTab={currentTab}
                    setActiveTab={setCurrentTab}
                />
            )}

            {currentTab === 'create-recipe' ? <MyRecipes /> : <MyMealPlans />}
        </div>
    );
};

export default ProfilePage;
