import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common';
import { useAuthStore } from '@root/store';

const FollowingPage: FC = () => {
    const { t } = useTranslation();
    const { userProfile } = useAuthStore();

    return (
        <UserList
            title={t('FollowingPage.title')}
            type="following"
            userId={userProfile?.id || ''}
            description={t('FollowingPage.description')}
        />
    );
};

export default FollowingPage;
