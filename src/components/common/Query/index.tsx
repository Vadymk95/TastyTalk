import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface QueryProps {
    query: string;
    className?: string;
}

export const Query: FC<QueryProps> = ({ query, className }) => {
    const { t } = useTranslation();
    const classNames = className ? ' ' + className : '';

    return (
        <section className={`plate${classNames}`}>
            <h2 className="text-2xl font-heading text-primary mb-4">
                {t('General.yourQueryTitle')}
            </h2>
            <p className="text-neutral-dark border p-2 rounded-lg bg-neutral-light">
                {query}
            </p>
        </section>
    );
};
