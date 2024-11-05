import { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
            <span>
                {t('error')} {errorMessage || t('somethingWentWrong')}
            </span>
        </div>
    );
};
