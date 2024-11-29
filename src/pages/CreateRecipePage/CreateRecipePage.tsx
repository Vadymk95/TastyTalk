import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    CreateRecipeManuallyForm,
    CreateRecipeWithAIForm
} from '@root/components/forms';
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
        <div className="w-full flex flex-col pb-8 sm:pb-4 space-y-8 sm:space-y-4">
            <h1 className="main-heading mb-0">
                {t(`CreateRecipePage.${withAI ? 'titleAI' : 'title'}`)}
            </h1>
            <p className="text-center label">
                {t(
                    `CreateRecipePage.${withAI ? 'descriptionAI' : 'description'}`
                )}
            </p>

            <Tabs
                tabs={tabs}
                variant="secondary"
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
            />

            <div>
                {withAI ? (
                    <CreateRecipeWithAIForm />
                ) : (
                    <CreateRecipeManuallyForm />
                )}
            </div>
        </div>
    );
};

export default CreateRecipePage;
