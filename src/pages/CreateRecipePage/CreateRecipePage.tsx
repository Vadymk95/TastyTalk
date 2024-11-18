import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateRecipeForm } from '@root/components/forms';
import { Tabs } from '@root/components/ui';

const CreateRecipePage: FC = () => {
    const { t } = useTranslation();
    const tabs = [
        { key: 'create-recipe-with-ai', label: t('CreateRecipePage.tabAI') },
        {
            key: 'create-recipe-manually',
            label: t('CreateRecipePage.tabManually')
        }
    ];
    const [currentTab, setCurrentTab] = useState(tabs[0].key);
    const withAI = currentTab === 'create-recipe-with-ai';

    return (
        <>
            <h1 className="text-3xl font-bold text-secondary text-center mb-6">
                {t(`CreateRecipePage.${withAI ? 'titleAI' : 'title'}`)}
            </h1>
            <p className="text-center text-neutral/100 mb-8">
                {t(
                    `CreateRecipePage.${currentTab === 'create-recipe-with-ai' ? 'descriptionAI' : 'description'}`
                )}
            </p>

            <Tabs
                tabs={tabs}
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
                className="mb-8"
            />

            <CreateRecipeForm withAI={withAI} />
        </>
    );
};

export default CreateRecipePage;
