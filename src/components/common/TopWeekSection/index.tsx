import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Section } from '@root/components/ui/Section';

import { faFire } from '@fortawesome/free-solid-svg-icons';

import { topWeekRecipes } from './data';

export const TopWeekSection: FC = () => {
    const { t } = useTranslation();
    const onShowMore = () => {};

    return (
        <Section
            title={t('TopWeekSection.title')}
            list={topWeekRecipes}
            onShowMore={onShowMore}
            icon={faFire}
            sectionKey="topWeek"
        />
    );
};
