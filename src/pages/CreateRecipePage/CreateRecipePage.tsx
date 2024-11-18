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
        <div className="w-full">
            <h1 className="text-4xl sm:text-2xl font-bold text-white/90 text-center mb-8 shadow-sm font-heading">
                {t(`CreateRecipePage.${withAI ? 'titleAI' : 'title'}`)}
            </h1>
            <p className="text-center text-neutral-dark/60 mb-8">
                {t(
                    `CreateRecipePage.${withAI ? 'descriptionAI' : 'description'}`
                )}
            </p>

            <Tabs
                tabs={tabs}
                variant="secondary"
                activeTab={currentTab}
                setActiveTab={setCurrentTab}
                className="mb-8"
            />

            <CreateRecipeForm withAI={withAI} />
        </div>
    );
};

export default CreateRecipePage;
