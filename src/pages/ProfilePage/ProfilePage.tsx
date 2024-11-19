import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';

const ProfilePage: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="main-heading">Profile Page</h1>
            <div className="inline-flex">
                <Link className="link-accent p-4" to={routes.recipesCreate}>
                    {t('ProfilePage.createRecipe')}
                </Link>
                <Link className="link-accent p-4" to={routes.settings}>
                    {t('ProfilePage.settings')}
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
