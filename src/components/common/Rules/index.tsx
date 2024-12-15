import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Rules: FC = () => {
    const { t } = useTranslation();
    const RULES = 15;
    const rulesList = Array.from({ length: RULES });

    return (
        <div className="space-y-4 text-neutral-dark text-sm">
            <p className="label mb-6">{t('Rules.description')}</p>
            <div className="divider" />
            {rulesList.map((_, index) => (
                <p key={index}>{t(`Rules.rule${index + 1}`)}</p>
            ))}
            <div className="divider" />
        </div>
    );
};
