import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ErrorCardProps = {
    errorMessage: string | null;
    className?: string;
};

export const ErrorCard: FC<ErrorCardProps> = ({
    errorMessage = '',
    className
}) => {
    const { t } = useTranslation();
    return (
        <div className={`card card-error ${className}`}>
            <FontAwesomeIcon
                className="mr-3"
                icon={faExclamationTriangle}
                size="xl"
            />

            <span>
                {t('General.error')}{' '}
                {errorMessage || t('General.somethingWentWrong')}
            </span>
        </div>
    );
};
