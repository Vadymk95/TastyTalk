import { FC } from 'react';

import { UserList } from '@root/components/common/UserList';
import { useAuthStore } from '@root/store/authStore';
import { useTranslation } from 'react-i18next';

const FollowersPage: FC = () => {
    const { t } = useTranslation();
    const { userProfile } = useAuthStore();

    return (
        <UserList
            title={t('FollowersPage.title')}
            type="followers"
            userId={userProfile?.id || ''}
            description={t('FollowersPage.description')}
        />
    );
};

export default FollowersPage;
