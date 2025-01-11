import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserList } from '@root/components/common';
import { useAuthStore } from '@root/store';
import { useFollowing } from '../../hooks';

const FollowingPage: FC = () => {
    const { t } = useTranslation();
    const { userProfile } = useAuthStore();
    const {
        following,
        followingSearchQuery,
        setFollowingSearchQuery,
        loadMore,
        loading,
        error
    } = useFollowing(userProfile?.id || '');

    return (
        <UserList
            title={t('FollowingPage.title')}
            description={t('FollowingPage.description')}
            users={following}
            searchQuery={followingSearchQuery}
            setSearchQuery={setFollowingSearchQuery}
            loadMore={loadMore}
            loading={loading}
            error={error}
        />
    );
};

export default FollowingPage;
