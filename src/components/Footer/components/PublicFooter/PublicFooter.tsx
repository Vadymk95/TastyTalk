import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const PublicFooter: FC = () => {
    const { t } = useTranslation();

    return (
        <p className="text-sm text-neutral flex-all-center h-full">
            {t('Footer.allRights')}
        </p>
    );
};
