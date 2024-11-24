import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Difficulty } from '@root/types';

import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DifficultyMapProps {
    level: Difficulty;
    className?: string;
}

export const DifficultyMap: FC<DifficultyMapProps> = ({ level, className }) => {
    const { t } = useTranslation();

    if (level === 'easy') {
        return (
            <p
                className={`flex items-center text-secondary gap-2 ${className}`}
            >
                <span>{t('Recipe.difficulty')}</span>
                <FontAwesomeIcon icon={faFire} />
            </p>
        );
    }

    if (level === 'medium') {
        return (
            <p className="flex items-center text-accent gap-2">
                <span>{t('Recipe.difficulty')}</span>
                <span className="flex items-center gap-0.5">
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </p>
        );
    }

    if (level === 'hard') {
        return (
            <p className="flex items-center text-primary gap-2">
                <span>{t('Recipe.difficulty')}</span>
                <span className="flex items-center gap-0.5">
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </p>
        );
    }
};
