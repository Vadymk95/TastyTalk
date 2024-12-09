import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Back: FC = () => {
    const { t } = useTranslation();

    const goBack = () => {
        window.history.back();
    };

    return (
        <Button onClick={goBack} className="flex items-center">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="sm:hidden">{t('General.back')}</span>
        </Button>
    );
};
