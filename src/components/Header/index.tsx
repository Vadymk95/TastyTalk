import { Navigation } from '@root/components';
import { routes } from '@root/router/routes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
    const { t } = useTranslation();

    return (
        <header className="header">
            <div className="container flex justify-between">
                <Link to={routes.home} className="link-primary nav-link p-4">
                    {t('Header.brand')}
                </Link>

                <Navigation />
            </div>
        </header>
    );
};
