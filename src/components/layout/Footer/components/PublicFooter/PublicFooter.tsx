import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const PublicFooter: FC = () => {
    const { t } = useTranslation();

    return (
        <p className="text-neutral flex-all-center h-full p-4">
            {t('Footer.allRights')}
        </p>
    );
};
