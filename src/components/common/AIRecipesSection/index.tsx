import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Section } from '@root/components/ui/Section';

import { faRobot } from '@fortawesome/free-solid-svg-icons';

import { aiRecommendationRecipes } from './data';

export const AIRecipesSection: FC = () => {
    const { t } = useTranslation();
    const onShowMore = () => {};

    return (
        <Section
            title={t('AIRecipesSection.title')}
            list={aiRecommendationRecipes}
            onShowMore={onShowMore}
            icon={faRobot}
            sectionKey="aiRecipes"
        />
    );
};
