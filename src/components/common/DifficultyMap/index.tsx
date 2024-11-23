import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Difficulty } from '@root/types';

import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DifficultyMapProps {
    level: Difficulty;
}

export const DifficultyMap: FC<DifficultyMapProps> = ({ level }) => {
    const { t } = useTranslation();

    console.log(level);

    if (level === 'easy') {
        return (
            <h3 className="text-xl font-heading mb-2 flex items-center text-secondary gap-2">
                <span>{t('Recipe.difficulty')}</span>
                <FontAwesomeIcon icon={faFire} />
            </h3>
        );
    }

    if (level === 'medium') {
        return (
            <h3 className="text-xl font-heading mb-2 flex items-center text-accent gap-2">
                <span>{t('Recipe.difficulty')}</span>
                <span className="flex items-center gap-0.5">
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </h3>
        );
    }

    if (level === 'hard') {
        return (
            <h3 className="text-xl font-heading mb-2 flex items-center text-primary gap-2">
                <span>{t('Recipe.difficulty')}</span>
                <span className="flex items-center gap-0.5">
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </h3>
        );
    }
};
