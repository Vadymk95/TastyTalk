import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MainFilterBlock } from '@root/components/common';
import { Tabs } from '@root/components/ui';

export const HomePage: FC = () => {
    const { t } = useTranslation();
    const tabs = [
        { key: 'create-recipe', label: t('ProfilePage.myRecipes') },
        {
            key: 'create-meal-plan',
            label: t('ProfilePage.myMealPlans')
        }
    ];
    const [currentTab, setCurrentTab] = useState(tabs[0].key);

    return (
        <div>
            <Tabs
                className="mb-4"
                tabs={tabs}
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
            />
            <MainFilterBlock />
        </div>
    );
};
