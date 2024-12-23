import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { useTranslation } from 'react-i18next';

interface ErrorComponentProps {
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({
    message = '',
    actionLabel = '',
    onAction
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="flex flex-col flex-all-center h-screen">
            <h1 className="main-heading">{t('General.oops')}</h1>
            <p className="label text-lg mb-6 text-center">
                {message || t('General.somethingWentWrong')}
            </p>

            <Button size="large" onClick={handleAction}>
                {actionLabel || t('General.back')}
            </Button>
        </div>
    );
};
