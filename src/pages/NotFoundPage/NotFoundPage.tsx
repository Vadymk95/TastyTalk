import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Image } from '@root/components/ui';
import { routes } from '@root/router/routes';

import notFound from '@root/assets/images/404.webp';

const NotFoundPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const toHomePage = () => {
        navigate(routes.home);
    };

    return (
        <div className="flex-all-center">
            <div className="flex flex-col items-center">
                <h1 className="main-heading">{t('NotFoundPage.notFound')}</h1>

                <p className="text-xl text-center text-neutral-dark mb-5">
                    {t('NotFoundPage.oops')}
                </p>

                <Button onClick={toHomePage}>{t('NotFoundPage.goHome')}</Button>

                <Image
                    src={notFound}
                    alt={t('NotFoundPage.notFound')}
                    className="w-1/2 lg:w-3/5 md:!w-4/5 mt-8 rounded-lg"
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
