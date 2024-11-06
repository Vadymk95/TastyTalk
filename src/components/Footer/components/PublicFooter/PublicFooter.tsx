import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const PublicFooter: FC = () => {
    const { t } = useTranslation();

    return (
        <p className="text-sm text-neutral text-center p-4">
            {t('Footer.allRights')}
        </p>
    );
};
