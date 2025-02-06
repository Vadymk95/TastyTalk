import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Section } from '@root/components/ui/Section';

import { faRobot } from '@fortawesome/free-solid-svg-icons';

const testList = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export const AIRecipesSection: FC = () => {
    const { t } = useTranslation();
    const onShowMore = () => {};

    return (
        <Section
            title={t('AIRecipesSection.title')}
            list={testList}
            onShowMore={onShowMore}
            icon={faRobot}
            sectionKey="aiRecipes"
        />
    );
};
