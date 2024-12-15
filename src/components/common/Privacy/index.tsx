import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Privacy: FC = () => {
    const { t } = useTranslation();
    const PRIVACY_RULES = 9;
    const privacyRulesList = Array.from({ length: PRIVACY_RULES });

    return (
        <div className="space-y-4 text-neutral-dark text-sm">
            <p className="label mb-6">{t('Privacy.description')}</p>
            <div className="divider" />
            {privacyRulesList.map((_, index) => (
                <p key={index}>{t(`Privacy.rule${index + 1}`)}</p>
            ))}
            <div className="divider" />
        </div>
    );
};
