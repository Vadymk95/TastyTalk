import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const PublicFooter: FC = () => {
    const { t } = useTranslation();

    return (
        <span className="text-sm text-neutral">{t('Footer.allRights')}</span>
    );
};
