import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';

const ProfilePage: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>Profile Page</h1>
            <Link className="link-secondary p-4" to={routes.settings}>
                {t('ProfilePage.settings')}
            </Link>
        </div>
    );
};

export default ProfilePage;
