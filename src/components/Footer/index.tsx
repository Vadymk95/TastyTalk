import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container text-center">
                <span className="text-sm text-neutral">
                    {t('Footer.allRights')}
                </span>
            </div>
        </footer>
    );
};
