import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
    ErrorComponent,
    MyMealPlans,
    MyRecipes,
    Profile
} from '@root/components/common';
import { Loader, Tabs } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore, useUsersStore } from '@root/store';
import { UserProfile } from '@root/types';

const ProfilePage: FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { userProfile, loading, error, hasPaidPlan } = useAuthStore();
    const { fetchUserByUsername, setViewedUser } = useUsersStore();
    const { t } = useTranslation();

    const [profile, setProfile] = useState<UserProfile | null>(null);

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
                setViewedUser(userProfile);
                return;
            }

            const anotherUser = await fetchUserByUsername(username);

            if (!anotherUser) {
                return navigate(routes.home);
            }

            setProfile(anotherUser);
        };

        loadProfile();
    }, [username, userProfile, fetchUserByUsername, navigate, setViewedUser]);

    if (loading || !profile) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent />;
    }

    const hasPlan = hasPaidPlan();

    return (
        <div className="plate">
            {profile && (
                <Profile setCurrentTab={setCurrentTab} profile={profile} />
            )}

            {hasPlan && (
                // добавить чек, может ли зарегистрированный юзер видеть табы другого юзера
                <Tabs
                    fullwidth
                    tabs={tabs}
                    variant="secondary"
                    activeTab={currentTab}
                    setActiveTab={setCurrentTab}
                />
            )}

            {profile && currentTab === 'create-recipe' ? (
                <MyRecipes />
            ) : (
                <MyMealPlans />
            )}
        </div>
    );
};

export default ProfilePage;
