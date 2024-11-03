import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-center text-3xl">{t('brand')}</h1>
        </div>
    );
};
