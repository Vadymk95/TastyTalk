import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

const ProfileSettingsPage: FC = () => {
    const { t } = useTranslation();
    const { signOutUser } = useAuthStore();

    return (
        <div>
            <h1>Profile Settings</h1>
            <Link
                onClick={signOutUser}
                to={routes.home}
                className="link-secondary p-4"
            >
                {t('Header.signOut')}
            </Link>
        </div>
    );
};

export default ProfileSettingsPage;
