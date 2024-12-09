import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';
import { isMobileDevice } from '@root/helpers';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BackProps {
    className?: string;
}

export const Back: FC<BackProps> = ({ className = '' }) => {
    const { t } = useTranslation();
    const isMobile = isMobileDevice();
    const goBack = () => window.history.back();

    return (
        <Button
            onClick={goBack}
            size={isMobile ? 'large' : 'medium'}
            className={`flex items-center ${className}`}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="sm:hidden ml-2 sm:ml-0">{t('General.back')}</span>
        </Button>
    );
};
