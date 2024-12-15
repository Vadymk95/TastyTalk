import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';

export const RulesAndPrivacy: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="text-neutral-dark space-y-2">
            <p className="mb-6">{t('RulesAndPrivacy.description')}</p>
            <div>
                <span className="block label">
                    {t('RulesAndPrivacy.rulesLabel')}
                </span>
                <Link
                    className="link-thirtiary underline"
                    to={routes.rules}
                    target="_blank"
                >
                    {t('RulesAndPrivacy.rulesLink')}
                </Link>
            </div>
            <div>
                <span className="block label">
                    {t('RulesAndPrivacy.privacyLabel')}
                </span>
                <Link
                    className="link-thirtiary underline"
                    to={routes.privacy}
                    target="_blank"
                >
                    {t('RulesAndPrivacy.privacyLink')}
                </Link>
            </div>
        </div>
    );
};
